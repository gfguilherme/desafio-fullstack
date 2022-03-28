import { differenceInCalendarDays, format, parseISO } from "date-fns";
import { useState } from "react";
import { Graph } from "../../components/Graph";
import { InvestmentDetailsModal } from "../../components/InvestmentDetailsModal";
import { api } from "../../services/api";
import { roundDecimals } from "../../utils/roundDecimals";
import "./styles.css";

export function Simulator() {
  const [date, setDate] = useState<string>("");
  const [investedAmount, setInvestedAmount] = useState<string>("10000");
  const [todayInvestedTotal, setTodayInvestedTotal] = useState<number | null>(
    null
  );
  const [accumulatedProfits, setAccumulatedProfits] = useState<number | null>(
    null
  );
  const [historicalData, setHistoricalData] = useState<any[] | null>(null);
  const [modalShow, setModalShow] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState<string>("BRL");
  const [totalCoinAmount, setTotalCoinAmount] = useState<number>(0);
  const [cryptocurrencySymbol, setCryptocurrencySymbol] =
    useState<string>("BTC");

  async function handleSubmit() {
    const endDate = Date.now();
    const startDate = parseISO(date);
    const numOfDays = differenceInCalendarDays(endDate, startDate);

    try {
      const response = await api.get("histoday", {
        params: {
          fsym: cryptocurrencySymbol,
          tsym: currencySymbol,
          limit: numOfDays,
        },
      });

      const historicalData = response.data.Data.Data;

      setHistoricalData(historicalData);

      const initialCoinValue = historicalData[0].close;
      const currentCoinValue = historicalData[historicalData.length - 1].close;

      const coinAmount = parseFloat(investedAmount) / initialCoinValue;
      const coinToCurrentPrice = coinAmount * currentCoinValue;

      const percentGained =
        ((coinToCurrentPrice - parseFloat(investedAmount)) /
          parseFloat(investedAmount)) *
        100;

      setAccumulatedProfits(roundDecimals(percentGained, 2));
      setTodayInvestedTotal(roundDecimals(coinToCurrentPrice, 2));
      setTotalCoinAmount(roundDecimals(coinAmount, 5));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
        <div className="container-fluid">
          <div className="simulator-header">
            <h1 className="title">Simulador</h1>
            <p className="description">
              Veja o <strong>real valor</strong> da rentabilidade de sua
              aplicação em criptomoedas.
            </p>
          </div>
        </div>
        <div className="container">
          <h2 className="section-description">Simule agora</h2>
          <p>
            Insira as informações e comece a investir em uma experiência fácil e
            intuitiva:
          </p>

          <div className="simulator">
            <div className="simulator__controls">
              <div className="simulator__control-item">
                <h3 className="title">
                  Para começar, com qual moeda você gostaria de investir?
                </h3>
                <span className="value">
                  <select
                    className="form-select"
                    value={currencySymbol}
                    onChange={(e) => {
                      setCurrencySymbol(e.target.value);
                    }}
                  >
                    <option value="BRL">BRL</option>
                    <option value="USD">USD</option>
                  </select>
                </span>
              </div>

              <div className="simulator__control-item">
                <h3 className="title">
                  E qual criptomoeda gostaria de comprar?
                </h3>
                <span className="value">
                  <select
                    className="form-select"
                    onChange={(e) => {
                      setCryptocurrencySymbol(e.target.value);
                    }}
                  >
                    <option value="BTC">BTC</option>
                    <option value="ETH">ETH</option>
                  </select>
                </span>
              </div>

              <div className="simulator__control-item">
                <h3 className="title">Qual valor você gostaria de investir?</h3>
                <span className="value">
                  <span>{currencySymbol === "BRL" ? "R$" : "$"}&nbsp;</span>
                  <input
                    className="form-control__text money-input"
                    type="text"
                    value={investedAmount}
                    onChange={(event) => setInvestedAmount(event.target.value)}
                    maxLength={13}
                  ></input>
                </span>
              </div>

              <div className="simulator__control-item">
                <h3 className="title">Qual a data do investimento inicial?</h3>
                <span className="value">
                  <input
                    className="form-control__text"
                    type="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    max={format(Date.now(), "yyyy-MM-dd")}
                  ></input>
                </span>
              </div>
              <button
                onClick={handleSubmit}
                type="button"
                className="btn btn-primary"
              >
                Gerar gráfico
              </button>
            </div>

            {todayInvestedTotal ? (
              <div className="simulator-results">
                <div
                  className="simulator-graph-result-container"
                  onClick={() => setModalShow(true)}
                >
                  <Graph
                    historicalData={historicalData}
                    investedAmount={investedAmount}
                  />
                </div>
                <h4 className="chart-description">
                  Clique no gráfico para ver os detalhes do investimento
                </h4>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <InvestmentDetailsModal
        accumulatedProfits={accumulatedProfits}
        initialInvestmentDate={date}
        investedAmount={investedAmount}
        onHide={() => {
          setModalShow(false);
        }}
        show={modalShow}
        todayInvestedTotal={todayInvestedTotal}
        totalCoinAmount={totalCoinAmount}
        currencySymbol={currencySymbol}
        cryptocurrencySymbol={cryptocurrencySymbol}
      />
    </>
  );
}
