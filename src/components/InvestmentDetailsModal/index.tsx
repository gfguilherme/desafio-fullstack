import { format, parseISO } from "date-fns";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { ModalProps } from "react-bootstrap/Modal";
import { roundDecimals } from "../../utils/roundDecimals";
import "./styles.css";

interface investmentDetailsModalProps extends ModalProps {
  accumulatedProfits: number | null;
  cryptocurrencySymbol: string;
  currencySymbol: string;
  initialInvestmentDate: string;
  investedAmount: string;
  todayInvestedTotal: number | null;
  totalCoinAmount: number;
}

export function InvestmentDetailsModal({
  accumulatedProfits,
  cryptocurrencySymbol,
  currencySymbol,
  initialInvestmentDate,
  investedAmount,
  onHide,
  show,
  todayInvestedTotal,
  totalCoinAmount,
}: investmentDetailsModalProps) {
  const symbol = currencySymbol === "BRL" ? "R$" : "$";

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalhes do investimento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3 className="crypto-title">
          {cryptocurrencySymbol === "BTC" ? "Bitcoin" : "Ethereum"}
        </h3>
        <Container>
          <Row xs="auto" className={"result-row"}>
            <Col>
              <p className={"detail-label"}>Dia de início</p>
            </Col>
            <Col>
              <span className={"detail-value"}>
                {initialInvestmentDate ? format(parseISO(initialInvestmentDate), "dd/MM/yyyy") : null}
              </span>
            </Col>
          </Row>

          <Row xs="auto" className={"result-row"}>
            <Col>
              <p className={"detail-label"}>Valor aplicado</p>
            </Col>
            <Col>
              <span className={"detail-value"}>
                {symbol} {investedAmount}
              </span>
            </Col>
          </Row>

          <Row xs="auto" className={"result-row"}>
            <Col>
              <p className={"detail-label"}>Valor total hoje</p>
            </Col>
            <Col>
              <span className={"detail-value"}>
                {symbol} {todayInvestedTotal}
              </span>{" "}
            </Col>
          </Row>

          <Row xs="auto" className={"result-row"}>
            <Col>
              <p className={"detail-label"}>Quantidade de criptomoedas</p>
            </Col>
            <Col>
              <span className={"detail-value"}>{totalCoinAmount}</span>{" "}
            </Col>
          </Row>

          <Row xs="auto" className={"result-row"}>
            <Col>
              <p className={"detail-label"}>Rendimento total</p>
            </Col>
            <Col>
              <span className={"detail-value"}>
                {symbol}{" "}
                {roundDecimals(
                  todayInvestedTotal! - parseFloat(investedAmount),
                  2
                )}
              </span>
            </Col>
          </Row>

          <Row xs="auto" className={"result-row"}>
            <Col>
              <p className={"detail-label"}>Rentabilidade acumulada</p>
            </Col>
            <Col>
              <span className={"detail-value"}>{accumulatedProfits}%</span>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  );
}
