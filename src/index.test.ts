import { makeHook, Hook } from "./index";

describe("makeHook", () => {
  test("extracts all methods of the class passed", () => {
    class MyHook extends Hook {
      constructor() {
        super();
      }
      mounted() {}
      private privateMethod() {}
    }

    const callbacks = makeHook(MyHook);

    expect(callbacks).toEqual({
      mounted: MyHook.prototype.mounted,
      privateMethod: (MyHook.prototype as any).privateMethod,
    });
  });
});
