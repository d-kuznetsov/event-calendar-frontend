import { notify } from "@kyvg/vue3-notification";

export function notifyError(text: string) {
  notify({
    type: "error",
    title: "Error",
    text,
  });
}
