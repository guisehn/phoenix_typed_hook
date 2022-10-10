import type { LiveSocket } from "phoenix_live_view";

export abstract class Hook {
  /**
   * Attribute referencing the bound DOM node.
   * [More information](https://hexdocs.pm/phoenix_live_view/0.18.0/js-interop.html#client-hooks-via-phx-hook)
   */
  el: HTMLElement;

  /**
   * The reference to the underlying `LiveSocket` instance.
   * [More information](https://hexdocs.pm/phoenix_live_view/0.18.0/js-interop.html#client-hooks-via-phx-hook)
   */
  liveSocket: LiveSocket;

  /**
   * Method to push an event from the client to the LiveView server.
   * [More information](https://hexdocs.pm/phoenix_live_view/0.18.0/js-interop.html#client-hooks-via-phx-hook)
   */
  pushEvent: (
    event: string,
    payload: any,
    callback?: (reply: any, ref: number) => void
  ) => void;

  /**
   * Method to push targeted events from the client to LiveViews and LiveComponents.
   * It sends the event to the LiveComponent or LiveView the `selectorOrTarget` is defined
   * in, where its value can be either a query selector or an actual DOM element. If the
   * query selector returns more than one element it will send the event to all of them,
   * even if all the elements are in the same LiveComponent or LiveView.
   * [More information](https://hexdocs.pm/phoenix_live_view/0.18.0/js-interop.html#client-hooks-via-phx-hook)
   */
  pushEventTo: (
    selectorOrTarget: Element | string,
    event: string,
    payload: any,
    callback?: (reply: any, ref: number) => void
  ) => void;

  /**
   * Method to handle an event pushed from the server.
   * [More information](https://hexdocs.pm/phoenix_live_view/0.18.0/js-interop.html#client-hooks-via-phx-hook)
   */
  handleEvent: (event: string, callback: (payload: any) => void) => void;

  /**
   * Method to inject a list of file-like objects into an uploader.
   * [More information](https://hexdocs.pm/phoenix_live_view/0.18.0/js-interop.html#client-hooks-via-phx-hook)
   */
  upload: (name: string, files: any) => void;

  /**
   * Method to inject a list of file-like objects into an uploader. The hook will send
   * the files to the uploader with `name` defined by
   * [`allow_upload/3`](https://hexdocs.pm/phoenix_live_view/Phoenix.LiveView.html#allow_upload/3)
   * on the server-side. Dispatching new uploads triggers an input change event which will be sent
   * to the LiveComponent or LiveView the selectorOrTarget is defined in, where its value can be
   * either a query selector or an actual DOM element. If the query selector returns more than one
   * live file input, an error will be logged.
   * [More information](https://hexdocs.pm/phoenix_live_view/0.18.0/js-interop.html#client-hooks-via-phx-hook)
   */
  uploadTo: (
    selectorOrTarget: Element | string,
    name: string,
    files: any
  ) => void;

  /**
   * The element has been added to the DOM and its server LiveView has finished mounting.
   * [More information](https://hexdocs.pm/phoenix_live_view/0.18.0/js-interop.html#client-hooks-via-phx-hook)
   */
  mounted(): void {}

  /**
   * The element is about to be updated in the DOM. Note: any call here must be synchronous as the operation
   * cannot be deferred or cancelled.
   * [More information](https://hexdocs.pm/phoenix_live_view/0.18.0/js-interop.html#client-hooks-via-phx-hook)
   */
  beforeUpdate(): void {}

  /**
   * The element has been updated in the DOM by the server.
   * [More information](https://hexdocs.pm/phoenix_live_view/0.18.0/js-interop.html#client-hooks-via-phx-hook)
   */
  updated(): void {}

  /**
   * The element has been removed from the page, either by a parent update, or by the parent being removed
   * entirely.
   * [More information](https://hexdocs.pm/phoenix_live_view/0.18.0/js-interop.html#client-hooks-via-phx-hook)
   */
  destroyed(): void {}

  /**
   * The element's parent LiveView has disconnected from the server.
   * [More information](https://hexdocs.pm/phoenix_live_view/0.18.0/js-interop.html#client-hooks-via-phx-hook)
   */
  disconnected(): void {}

  /**
   * The element's parent LiveView has reconnected to the server
   * [More information](https://hexdocs.pm/phoenix_live_view/0.18.0/js-interop.html#client-hooks-via-phx-hook)
   */
  reconnected(): void {}
}

export function makeHook(hookClass: typeof Hook): any {
  const methodNames = Object.getOwnPropertyNames(hookClass.prototype).filter(
    (name) => name !== "constructor"
  );

  const methods = methodNames.map((name) => [name, hookClass.prototype[name]]);

  return Object.fromEntries(methods);
}
