import * as appRoot from 'app-root-path';
import * as path from 'path';
import '../../utils/test_utils';
import { removeFolder } from '../../utils/test_utils';
import { fileExists, readFile } from '../../utils/utils';
import { createWriter } from '../writer';
describe('Writer test', () => {
  it('should get default root', () => {
    const res = createWriter({});
    expect(res.outputDirectory).toEqual(path.join(appRoot.path, 'dist'));
  });

  it('should get custom  root', () => {
    const res = createWriter({ root: __dirname });
    expect(res.outputDirectory).toMatchFilePath('src/core/__tests__/dist$');
  });

  describe('Correct template test', () => {
    it('should give default non production', () => {
      const res = createWriter({ root: __dirname });
      expect(res.template).toEqual('$name');
    });

    it('should give default production', () => {
      const res = createWriter({ root: __dirname, isProduction: true });
      expect(res.template).toEqual('$hash-$name');
    });

    it('should give custom non production', () => {
      const res = createWriter({ root: __dirname, output: '$hash.$name' });
      expect(res.template).toEqual('$name');
    });

    it('should give custom non production 2', () => {
      const res = createWriter({ root: __dirname, output: '$hash-$name' });
      expect(res.template).toEqual('$name');
    });

    it('should give custom non production 3', () => {
      const res = createWriter({ root: __dirname, output: '$hash_$name' });
      expect(res.template).toEqual('$name');
    });

    it('should give custom non production 4', () => {
      const res = createWriter({ root: __dirname, output: '$hash$name' });
      expect(res.template).toEqual('$name');
    });

    it('should give custom non production 5', () => {
      const res = createWriter({ root: __dirname, output: '$hash__$name' });
      expect(res.template).toEqual('$name');
    });

    it('should give custom non production 6', () => {
      const res = createWriter({ root: __dirname, output: '$hash--$name' });
      expect(res.template).toEqual('$name');
    });

    it('should give default production', () => {
      const res = createWriter({ root: __dirname, isProduction: true, output: '$name.$hash' });
      expect(res.template).toEqual('$name.$hash');
    });
  });

  describe('Generated path test', () => {
    it('should generate for dev', () => {
      const res = createWriter({ root: __dirname });
      const data = res.generate('foo.js', 'somecontents');
      expect(data.localPath).toEqual('foo.js');
    });

    it('should generate for prod', () => {
      const res = createWriter({ root: __dirname, isProduction: true });
      const data = res.generate('foo.js', 'somecontents');
      expect(data.localPath).toEqual('646b1c0e-foo.js');
    });

    it('should generate for prod (custom)', () => {
      const res = createWriter({ root: __dirname, output: '$hash.$name', isProduction: true });
      const data = res.generate('foo.js', 'somecontents');
      expect(data.localPath).toEqual('646b1c0e.foo.js');
    });

    it('should generate for prod with directory', () => {
      const res = createWriter({ root: __dirname, isProduction: true, output: '$name-$hash' });
      const data = res.generate('bar/foo.js', 'somecontents');
      expect(data.localPath).toMatchFilePath('bar/foo-646b1c0e.js$');
    });

    it('should give correct absPath 1', () => {
      const res = createWriter({ root: __dirname, isProduction: true, output: '$name-$hash' });
      const data = res.generate('bar/foo.js', 'somecontents');
      expect(data.absPath).toMatchFilePath('__tests__/bar/foo-646b1c0e.js$');
    });

    it('should give correct absPath 2', () => {
      const res = createWriter({ root: __dirname, isProduction: true, output: 'dist/$name-$hash' });
      const data = res.generate('bar/foo.js', 'somecontents');
      expect(data.absPath).toMatchFilePath('__tests__/dist/bar/foo-646b1c0e.js$');
    });

    it('should give correct relBrowserPath 1', () => {
      const res = createWriter({ root: __dirname, isProduction: true, output: '$name-$hash' });
      const data = res.generate('bar/foo.js', 'somecontents');

      expect(data.relBrowserPath).toEqual('bar/foo-646b1c0e.js');
    });

    it('should give correct relBrowserPath 2', () => {
      const res = createWriter({ root: __dirname, isProduction: true, output: 'some-dir/$name-$hash' });
      const data = res.generate('bar/foo.js', 'somecontents');
      expect(data.relBrowserPath).toEqual('bar/foo-646b1c0e.js');
    });

    it('should give size', () => {
      const res = createWriter({ root: __dirname, isProduction: true, output: 'some-dir/$name-$hash' });
      const data = res.generate('bar/foo.js', 'somecontents');
      expect(data.size).toEqual(12);
    });
  });

  describe('Write test', () => {
    it('should write file', async () => {
      removeFolder(path.join(__dirname, '.temp'));
      const res = createWriter({ root: __dirname, isProduction: true, output: '.temp/$name-$hash' });
      const data = res.generate('bar/foo.js', 'somecontents');
      await data.write();

      const expectedPath = path.join(__dirname, '.temp/bar/foo-646b1c0e.js');

      expect(fileExists(expectedPath)).toEqual(true);
    });

    it('should write directly', async () => {
      const res = createWriter({ root: __dirname, isProduction: true, output: '.temp/$name-$hash' });
      await res.write('something.js', 'foo');
      const expectedPath = path.join(__dirname, '.temp/something.js');
      expect(fileExists(expectedPath)).toEqual(true);
      expect(readFile(expectedPath)).toEqual('foo');
    });
  });
});
