
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

type FonteContextType = {
  tamanhoFonte: number;
  alterarTamanhoFonte: (tamanho: number) => void;
};

const FonteContext = createContext<FonteContextType>({
  tamanhoFonte: 1,
  alterarTamanhoFonte: () => {},
});

export function FonteProvider({ children }: { children: React.ReactNode }) {
  const [tamanhoFonte, setTamanhoFonte] = useState(1);

  useEffect(() => {
    async function carregarFonte() {
      try {
        const valorSalvo = await AsyncStorage.getItem('tamanhoFonte');

        if (valorSalvo !== null) {
          setTamanhoFonte(Number(valorSalvo));
        }
      } catch (erro) {
        console.log('Erro ao carregar a fonte:', erro);
      }
    }

    carregarFonte();
  }, []);

  async function alterarTamanhoFonte(tamanho: number) {
    setTamanhoFonte(tamanho);

    try {
      await AsyncStorage.setItem('tamanhoFonte', String(tamanho));
    } catch (erro) {
      console.log('Erro ao salvar a fonte:', erro);
    }
  }

  return (
    <FonteContext.Provider value={{ tamanhoFonte, alterarTamanhoFonte }}>
      {children}
    </FonteContext.Provider>
  );
}

export function useFonte() {
  return useContext(FonteContext);
}
