import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootStateT } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootStateT>();
