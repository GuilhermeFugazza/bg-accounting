import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const receita = 2672.68;
const despesa = 1908.35;

const formatCurrency = (value: number) => {
  return value.toFixed(2).replace('.', ',');
};

export default function HomeScreen() {
  return (
    <ThemedView style={styles.main}>
      <Image
        source={require('@/assets/images/darkbgabstract.png')}
        style={styles.headerImage}
      />
      <ThemedView style={styles.balance}>
        <View style={styles.balanceText}>
          <Text style={styles.balanceTitle}>Saldo disponível</Text>
          <Text style={styles.balanceNum}>R$ {formatCurrency(receita - despesa)}</Text>
        </View>
        <ThemedView style={styles.graphView}>
          <BarGraph receita={receita} despesa={despesa} />
          <View style={styles.viewLegend}>
            <Text style={styles.legend}>Despesas<View style={styles.legendIconr}></View></Text>
            <Text style={styles.legend}>Saldo<View style={styles.legendIconb}></View></Text>
          </View>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

interface BarGraphProps {
  receita: number;
  despesa: number;
}

const BarGraph: React.FC<BarGraphProps> = ({ receita, despesa }) => {
  const percentage = (despesa / receita) * 100;

  return (
    <View style={styles.barContainer}>
      <View style={styles.totalBar}>
        <View style={[styles.despesaBar, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    height: "100%",
    backgroundColor: "#fff",
  },
  headerImage: {
    width: "100%",
    height: 200,
  },
  balance: {
    alignItems: "flex-start",
    padding: 30,
    paddingTop: 15,
    justifyContent: "flex-start",
    display: "flex",
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderStyle: "solid",
    borderWidth: 1,
    fontFamily: "sans-serif",
    borderRadius: 10,
    width: 300,
    height: 150, // Aumentar a altura para incluir o gráfico e a legenda
    position: "absolute",
    top: 110,
    // Shadow properties
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Adjust the height to move shadow down
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10, // For Android
  },
  balanceText: {
    display: "flex",
    flexDirection: "column",
    color: "#191919",
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: "flex-start",
  },
  balanceTitle: {
    fontSize: 13,
    color: "#7E7E7E",
    fontWeight: "500",
    marginBottom: 1, // Adicionei margem inferior para espaçamento
  },
  balanceNum: {
    fontSize: 22,
  },
  graphView: {
    backgroundColor: "#fff",
    marginTop: 10,
    width: '100%',
  },
  barContainer: {
    marginTop: 10,
    width: '100%',
  },
  totalBar: {
    height: 15,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  despesaBar: {
    height: '100%',
    backgroundColor: '#E7815B',
    borderRadius: 10,
  },
  viewLegend: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: '55%',
  },
  legend: {
    fontSize: 12,
    color: "#AEAEAE",
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendIconr: {
    width: 10,
    height: 10,
    borderRadius: 50,
    marginLeft: 5,
    backgroundColor: "#E7815B"
  },
  legendIconb: {
    width: 10,
    height: 10,
    borderRadius: 50,
    marginLeft: 5,
    backgroundColor: "#E0E0E0"
  },
});