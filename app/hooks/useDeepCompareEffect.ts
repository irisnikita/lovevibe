import {useEffect, useRef} from 'react';
import isEqual from 'react-fast-compare';

function deepCompareEquals(a, b) {
  // TODO: implement deep comparison here
  // something like lodash
  // return _.isEqual(a, b);

  return isEqual(a, b);
}

function useDeepCompareMemoize(value) {
  const ref = useRef();
  // it can be done by using useMemo as well
  // but useRef is rather cleaner and easier

  if (!deepCompareEquals(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export function useDeepCompareEffect(callback, dependencies) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}
