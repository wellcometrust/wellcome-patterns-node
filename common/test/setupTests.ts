import '@testing-library/jest-dom';
import util from 'util';

Object.defineProperty(global, 'TextEncoder', {
  value: util.TextEncoder,
});

// This is required for dynamic imports to work in jest
// Solution from here: https://github.com/vercel/next.js/discussions/18855
jest.mock('next/dynamic', () => (func: () => Promise<any>) => {
  let component: any = null;
  func().then((module: any) => {
    component = module.default;
  });
  const DynamicComponent = (...args) => component(...args);
  DynamicComponent.displayName = 'LoadableComponent';
  DynamicComponent.preload = jest.fn();
  return DynamicComponent;
});
