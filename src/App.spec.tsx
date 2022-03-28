import { render, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Simulator } from "./pages/Simulator";

describe("Simulator component", () => {
  it("should not render result container", async () => {
    const { getByText } = render(
      <Simulator />
    );

    await waitFor(() => {
      expect(
        getByText("Clique no gráfico para ver os detalhes do investimento")
      ).not.toBeInTheDocument();
    });
  });


  it("should render result container", async () => {
    const { getByText, getByAltText, findByText, debug } = render(
      <Simulator />
    );

    const dateInput = getByAltText("date-input");
    const submitButton = getByText("Gerar gráfico");

    fireEvent.change(dateInput, { target: { value: "2021-12-15" } });
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        getByText("Clique no gráfico para ver os detalhes do investimento")
      ).toBeInTheDocument();
    });
  });
});
