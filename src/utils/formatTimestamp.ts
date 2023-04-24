import moment from "moment";

export function formatTimestamp(t: number) {
  return moment.unix(t).fromNow();
}
