import { ref, onUnmounted } from 'vue';

export function useRequest<T>(api: () => Promise<T>) {
  const data = ref<T | null>(null);
  const loading = ref(false);

  const run = async () => {
    loading.value = true;
    try {
      data.value = await api();
    } finally {
      loading.value = false;
    }
  };

  onUnmounted(() => {
    // 可扩展取消逻辑
  });

  run();

  return { data, loading, run };
}