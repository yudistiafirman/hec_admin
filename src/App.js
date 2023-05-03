import { BrowserRouter } from "react-router-dom";
import "./App.css";
import BackdropLoading from "./components/molecules/BackDrop";
import SnackBar from "./components/molecules/Snackbar";
import Route from "./route";
import { useBackdropStore } from "./stores/useBackdropStore";
import { useSnackBarStore } from "./stores/useSnackBarStore";

function App() {
  const [openBackdrop] = useBackdropStore((state) => [state.openBackdrop]);
  const [openSnackbar, message, type, handleCloseSnackbar] = useSnackBarStore(
    (state) => [
      state.openSnackbar,
      state.message,
      state.type,
      state.handleCloseSnackbar,
    ]
  );
  return (
    <>
      <BrowserRouter>
        <Route />
      </BrowserRouter>

      <BackdropLoading open={openBackdrop} />
      <SnackBar
        open={openSnackbar}
        message={message}
        type={type}
        onClose={handleCloseSnackbar}
      />
    </>
  );
}

export default App;
