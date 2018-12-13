import { uniqBy, remove } from 'lodash-es';

export function concat({result, change, state, placeholder}) {
  const oldData = (!change.oldVal || change.oldVal.search === change.newVal.search) ? state : [];
  
  if(!placeholder) {
    remove(oldData, (e) => e.placeholder);
  }
  
  return uniqBy([
    ...oldData,
    ...result
  ], 'id');
}

export function fetch({ result }) {
  return result;
}

export function custom(data) {
  return this.$unsplash.getOptions(data.target).mutation(data);
}