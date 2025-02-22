import { Button } from "@material-tailwind/react";

const FormActionButtons = () => {
    return (
        <div className="flex justify-end mt-6 gap-4">
            <Button
                color="blue-gray"
                className="flex-shrink-0"
                onClick={() => window.history.back()}
            >
                Volver
            </Button>
            <Button
                color="blue"
            >
                Guardar
            </Button>
        </div>
    );
}

export default FormActionButtons;