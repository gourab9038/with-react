import React, {
	useActionState,
	useCallback,
	useDeferredValue,
	useId,
	useMemo,
	useReducer,
	useState,
	useSyncExternalStore,
	useTransition,
	use,
} from 'react'
import { useFormStatus } from 'react-dom'

type ActionStateProps<State> = Parameters<typeof useActionState<State>>
export function WithActionState<State>({
	children,
	action,
	initialState,
	permalink,
}: {
	action: ActionStateProps<State>[0]
	initialState: ActionStateProps<State>[1]
	permalink?: ActionStateProps<State>[2]
	children: (state: ReturnType<typeof useActionState<State>>) => React.ReactNode
}) {
	return children(useActionState(action, initialState, permalink))
}

type CallbackProps<Callback extends (...args: unknown[]) => unknown> = Parameters<typeof useCallback<Callback>>
export function WithCallback<Callback extends (...args: unknown[]) => unknown>({
	children,
	callback,
	deps = [], // default to empty array, missing deps array is always a bug
}: {
	callback: CallbackProps<Callback>[0]
	deps?: CallbackProps<Callback>[1]
	children: (callback: ReturnType<typeof useCallback<Callback>>) => React.ReactNode
}) {
	return children(useCallback(callback, deps))
}

type DeferredValueProps<Value> = Parameters<typeof useDeferredValue<Value>>
export function WithDeferredValue<Value>({
	children,
	value,
}: {
	value: DeferredValueProps<Value>[0]
	children: (value: ReturnType<typeof useDeferredValue<Value>>) => React.ReactNode
}) {
	return children(useDeferredValue(value))
}

export function WithId({
	children,
}: {
	children: (id: ReturnType<typeof useId>) => React.ReactNode
}) {
	return children(useId())
}

type MemoProps<Value> = Parameters<typeof useMemo<Value>>
export function WithMemo<Value>({
	children,
	compute,
	deps = [], // default to empty array, missing deps array is always a bug
}: {
	compute: MemoProps<Value>[0]
	deps?: MemoProps<Value>[1]
	children: (value: ReturnType<typeof useMemo<Value>>) => React.ReactNode
}) {
	return children(useMemo(compute, deps))
}

export function WithReducer<
	State,
	InitialArg extends State,
	Action extends React.AnyActionArg
>({
	children,
	reducer,
	initialArg,
	init = (i: InitialArg) => i,
}: {
	reducer: (prevState: State, ...args: Action) => State
	initialArg: InitialArg
	init?: (i: InitialArg) => State
	children: (state: State, dispatch: React.ActionDispatch<Action>) => React.ReactNode
}) {
	const [state, dispatch] = useReducer<State, InitialArg, Action>(reducer, initialArg, init)
	return children(state, dispatch)
}

export function WithState<StateValue = undefined>({
	children,
	initialState,
}: {
	initialState?: StateValue | (() => StateValue)
	children: (state: StateValue | undefined, setState: React.Dispatch<React.SetStateAction<StateValue | undefined>>) => React.ReactNode
}) {
	const [state, setState] = useState<StateValue | undefined>(initialState)
	return children(state, setState)
}

type SyncExternalStoreProps<StoreValue> = Parameters<typeof useSyncExternalStore<StoreValue>>
export function WithSyncExternalStore<StoreValue>({
	children,
	subscribe,
	getSnapshot,
	getServerSnapshot,
}: {
	subscribe: SyncExternalStoreProps<StoreValue>[0]
	getSnapshot: SyncExternalStoreProps<StoreValue>[1]
	getServerSnapshot?: SyncExternalStoreProps<StoreValue>[2]
	children: (value: ReturnType<typeof useSyncExternalStore<StoreValue>>) => React.ReactNode
}) {
	return children(useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot))
}

export function WithTransition({
	children,
}: {
	children: (isPending: ReturnType<typeof useTransition>[0], startTransition: ReturnType<typeof useTransition>[1]) => React.ReactNode
}) {
	return children(...useTransition())
}

export function WithFormStatus({
	children,
}: {
	children: (status: ReturnType<typeof useFormStatus>) => React.ReactNode
}) {
	return children(useFormStatus())
}

type UseProps<Value> = Parameters<typeof use<Value>>
export function WithUse<Value>({
	children,
	value,
}: {
	value: UseProps<Value>[0]
	children: (value: Value) => React.ReactNode
}) {
	return children(use(value))
}
