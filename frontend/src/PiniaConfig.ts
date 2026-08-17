import { createPinia } from 'pinia';
import { watch } from 'vue';
import { bookSeeder } from '@/stores/bookseeder';

export default class PiniaConfig {
  public static init() {
    const pinia = createPinia();

    const savedState = localStorage.getItem('piniaState');

    if (savedState) {
      pinia.state.value = JSON.parse(savedState);
    } else {
      pinia.state.value = {
        book: {
          books: bookSeeder,
        },
      };

      localStorage.setItem('piniaState', JSON.stringify(pinia.state.value));
    }
// hace que cualquier cambio futuro en los libros se guarde automáticamente
    watch(
      pinia.state,
      (state) => {
        localStorage.setItem('piniaState', JSON.stringify(state));
      },
      { deep: true },
    );

    return pinia;
  }
}

// crea Pini, revisa si hay datos guardados, si existen los carga, si no existen, usa bookSeeder como datos iniciales.
// y los guarda en localStorage.
