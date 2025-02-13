import type { QueryResponse } from "$lib/api/api.types";

export type ModalProps = {
  showModal: boolean;
  responseList: QueryResponse[];
};
