interface Toast {
	id: string;
	message: string;
	type: 'success' | 'error' | 'warning' | 'info';
	duration?: number;
}
const toasts = $state<Toast[]>([]);
interface ToastState {
	readonly toasts: Toast[];
	readonly addToast: (message: string, type: Toast['type'], duration?: number) => void;
	readonly removeToast: (id: string) => void;
}

export const useToast = (): ToastState => {

	const addToast = (message: string, type: Toast['type'], duration: number = 3000) => {
		const id = Math.random().toString(36).substring(2, 15);
		toasts.push({ id, message, type, duration });
		console.log(toasts);
		setTimeout(() => {
			toasts.splice(toasts.findIndex((toast) => toast.id === id), 1);
		}, duration);
	};

	const removeToast = (id: string) => {
		toasts.splice(toasts.findIndex((toast) => toast.id === id), 1);
	};

	return {
		removeToast,
		toasts,
		addToast
	};
};