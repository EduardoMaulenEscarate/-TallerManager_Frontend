import { Button } from "@material-tailwind/react";
import { useAnimation } from "../hooks/useAnimation";

const FormActionButtons = () => {
    const { changePageAnimation } = useAnimation();
    const volver = () => {
        console.log("Volver: ", window.history);
        window.history.back();
        // changePageAnimation(window.history.back());
    }

    return (
        <div className="flex justify-end mt-6 gap-4">
            <Button
                color="blue-gray"
                className="flex-shrink-0"
                onClick={() => volver()}
            >
                Volver
            </Button>
            <Button
                color="blue"
                type="submit"
            >
                Guardar
            </Button>
        </div>
    );
}

export default FormActionButtons;