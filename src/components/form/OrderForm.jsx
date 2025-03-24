import { useEffect, useState } from "react";
import ValidatedInput from "./ValidatedInput";
import CustomSelect from "./CustomSelect"; 
import { Card, CardBody, Typography, Button, Textarea,IconButton  } from "@material-tailwind/react";
import { Camera, Plus, Trash2 } from "lucide-react";
import FormActionButtons from "../FormActionButtons";
import formService  from "../../api/formService";
import MultiSpareParts from "../MultiSpareParts";
import MultiService from "../MultiService";
import api from "../../api/api";
/** 
    * @fileoverview Componente para gestionar una orden
                    Permite agregar, editar y deshabilitar una orden
    * @param {object} formData - Información de la orden (en blanco o con datos)
    * @param {function} setFormData - Función para actualizar la información de la orden
    * @param {function} handleChange - Función para manejar el cambio de los campos
    * @param {function} handleSubmit - Función para enviar el formulario
    * @returns {JSX.Element} - Componente de React
*/
const OrderForm = ({ formData, setFormData, handleChange, handleFileFormSubmit }) => {
    const [photos, setPhotos] = useState([]);
    const [sparePartsOptions, setSparePartsoptions] = useState([]);
    const [servicesOptions, setServicesoptions] = useState([]);
    const [clientsOptions,  setClientesOptions] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isManualInput, setIsManualInput] = useState(true);
    const [vehiclesOptions, setVehicleOptions] = useState([]);
    const [labelVehicleSelect, setlabelVehicleSelect] = useState("Especifique un cliente primero");
    const [totalSpareParts, setTotalSpareParts] = useState(formData.totalSpareParts);
    const [totalServices, setTotalServices] = useState(formData.totalServices);
    const [total, setTotal] = useState(totalSpareParts + totalServices);

    useEffect(() => {
        // Obtiene los repuestos y servicios desde la API
        formService.getFields("repuestos")
            .then(response => {
                setSparePartsoptions(response.campos );
            }).catch(error => {
                console.error(error);
            });
            
        formService.getFields("servicios")
            .then(response => {
                setServicesoptions(response.campos);
            }).catch(error => {
                console.error(error);
            });

        formService.getFields("clientes")
            .then(response => {
                console.log("clientes", response.campos);
                
                setClientesOptions(response.campos);
            }).catch(error => {
                console.error(error);
            });
        }
    , []);

    // Manejadores de eventos

    /**
     * Cuando selecciona un cliente de la lista desplegada lo asigna a formData.client
     * @param {number} id - Identificador del cliente
     * @param {string} value - Nombre del cliente
    */ 
    const handleSelectedClient = ({id, value, clientVehicles}) => {
        setIsManualInput(false); // Desactiva la búsqueda automática
        setFilteredClients([]);
        
        // Actualiza el formData con el cliente seleccionado
        setFormData(prev => ({
            ...prev,
            client: value
        }));
    
        // Actualiza las opciones de vehículos
        const updatedVehiclesOptions = clientVehicles.map((vehicle) => {
            return {
                value: vehicle.id,
                label: `${vehicle.detalle.marca_auto.nombre} - ${vehicle.detalle.modelo} - ${vehicle.patente}`,
                svg: vehicle.detalle.marca_auto.logo,
            };
        });
    
        setVehicleOptions(updatedVehiclesOptions);
        setlabelVehicleSelect("Seleccione un vehículo");
        setIsOpen(false);
    };
    
    const handleClientInputChange = (e) => {
        setIsManualInput(true);
        handleChange(e); 
    };

    // cuando el cliente cambia busca en la lista de clientes y filtra los que coincidan
    useEffect(() => {
        if (!isManualInput) {
            // Si no es una entrada manual, evita que al seleccionar el cliente vuelva a ejecutar la búsqueda
            return;
        }

        if (formData.client.length < 2) {
            setFilteredClients([]);
            setVehicleOptions([]);
            return;
        }

        const searchTerm = formData.client.toLowerCase();
        const filtered = clientsOptions.filter(cliente =>  cliente.nombre.toLowerCase().includes(searchTerm));
        
        setFilteredClients(filtered);
        setlabelVehicleSelect("Especifique un cliente primero");
        setIsOpen(true);
    }, [formData.client]);


    const handleAddPhoto = (e) => {
        const files = Array.from(e.target.files);
        setPhotos([...photos, ...files]);
        handleChange({ target: { name: 'photos', value: [...photos, ...files] } });
    };

    const handleDeletePhoto = (index) => {
        const newPhotos = [...photos];
        newPhotos.splice(index, 1);
        setPhotos(newPhotos);
        handleChange({ target: { name: 'photos', value: newPhotos} }); 
          
    };

    // Actualiza el total de la orden
    useEffect(() => {
        setTotal(totalSpareParts + totalServices);
        formData.total = total;
    }, [totalSpareParts, totalServices]);

    return (
        <div className="flex-1 p-4 lg:p-6">
            {/* Encabezado */}
            <div className="mx-auto">
                <Card className="w-full bg-yellow-100">
                    <CardBody>
                        <Typography variant="paragraph" color="gray">
                            Complete todos los campos para enviar el formulario.
                            Los campos marcados con * son obligatorios.
                        </Typography>
                    </CardBody>
                </Card>
            </div>

            {/* Formulario */}
            <div className="mt-6 mx-auto">
                <Card>
                    <CardBody>
                        <form onSubmit={handleFileFormSubmit}>
                            {/* Seccion datos del cliente */}
                            <div>
                                <Typography variant="h6" color="blue-gray">
                                    Información básica
                                </Typography>
                                <hr className="mb-6" />
                            </div>

                            <div className="mb-2"></div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative">
                                <ValidatedInput
                                    label="Nombre del Cliente *"
                                    onChange={(e) => handleClientInputChange(e)}
                                    name="client"
                                    value={formData.client}
                                    required={true}
                                    minLength={2}
                                />
                                {
                                    filteredClients.length > 0 && isOpen &&(
                                        <div className="absolute z-10 w-full bg-white border border-blue-gray-200 shadow-md mt-1">
                                            {filteredClients.map((cliente, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="p-2 hover:bg-blue-100 cursor-pointer"
                                                        onClick={() => handleSelectedClient({ id: cliente.id, value: cliente.nombre, clientVehicles: cliente.autos })}
                                                    >
                                                        {cliente.nombre}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )
                                }
                                </div>
                                <CustomSelect
                                    label={"Vechiculo"}
                                    name="vehicle"
                                    value={formData.orderVehicle}
                                    options={vehiclesOptions}
                                    required={true}
                                    onChange={(value) => handleChange({ target: { name: 'orderVehicle', value } })}
                                    placeholder={labelVehicleSelect}
                                />
                                
                                <CustomSelect
                                    label={"Prioridad"}
                                    name="priority"
                                    value={formData.priority}
                                    options={[
                                        { value: 1, label: "Baja" },
                                        { value: 2, label: "Normal" },
                                        { value: 3, label: "Alta" },
                                        { value: 4, label: "Urgente" },
                                    ]}
                                    required={true}
                                    onChange={(value) => handleChange({ target: { name: 'priority', value } })}
                                />
                                

                                <ValidatedInput
                                    label="Kilometraje *"
                                    type="number"
                                    onChange={(e) => handleChange(e)}
                                    name="kilometraje"
                                    value={formData.kilometraje}
                                    required={true}
                                    minLength={2}
                                />

                                <ValidatedInput
                                    label="Fecha estimada de entrega"
                                    type="date"
                                    onChange={(e) => handleChange(e)}
                                    name="estimatedDelivery"
                                    value={formData.estimatedDelivery}
                                    required={true}
                                    minLength={2}
                                />
                            </div>

                            {/* Sección fotos del vehiculo */}
                            <div className="space-y-6 mt-10">
                                <div
                                    className="bg-white rounded-lg border border-blue-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                                >
                                    {/* Encabezado del vehículo */}
                                    <div className="bg-blue-gray-50 p-4 rounded-t-lg flex justify-between items-center align-middle">
                                        <div className="flex items-center gap-2">
                                            <Camera className="h-5 w-5 text-blue-gray-700" />
                                            <Typography variant="h6" color="blue-gray">
                                                Fotos
                                            </Typography>
                                        </div>
                                        <Button
                                            color="green"
                                            className=" flex items-center gap-2"
                                        >
                                            <Plus className="h-4 w-4" />
                                            Agregar Foto
                                            <input
                                                type="file"
                                                name="photos"
                                                multiple
                                                accept="image/*"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                onChange={handleAddPhoto}
                                            />
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                                        {photos.length > 0 ? photos.map((foto, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={URL.createObjectURL(foto)}
                                                    alt={`Foto ${index + 1}`}
                                                    className="w-full h-32 object-cover rounded-lg"
                                                />
                                                <IconButton
                                                    variant="filled"
                                                    color="red"
                                                    size="sm"
                                                    className="!absolute top-2 right-2 md:opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => handleDeletePhoto(index)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </IconButton>
                                            </div>
                                        )) : (
                                            <div className="col-span-2 md:col-span-4 flex items-center justify-center h-12 text-blue-gray-500">
                                                No hay fotos seleccionadas
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Sección repuestos */}
                            <MultiSpareParts 
                                formData={formData} 
                                setFormData={setFormData} 
                                sparePartsOptions={sparePartsOptions}
                                totalSpareParts={totalSpareParts}
                                setTotalSpareParts={setTotalSpareParts}
                                total={total}
                                setTotal={setTotal}
                            />
                            
                            
                            {/* Seccion Servicios */}
                            <MultiService 
                                formData={formData} 
                                setFormData={setFormData} 
                                servicesOptions={servicesOptions}
                                totalServices={totalServices} 
                                setTotalServices={setTotalServices}
                                total={total}
                                setTotal={setTotal}
                            />
                                
                            <Card className="bg-blue-gray-50 mt mt-6">
                                <CardBody>
                                    <div className="flex justify-between items-center">
                                        <Typography variant="h5" color="blue-gray">
                                            Total de la Orden
                                        </Typography>
                                        <Typography variant="h4" color="blue">
                                            ${total}
                                        </Typography>
                                    </div>
                                </CardBody>
                            </Card>

                            {/* Seccion observacion */}
                            <div className="mt-8">
                                <Typography variant="h6" color="blue-gray">
                                    Observaciones
                                </Typography>
                                <hr className="mb-6" />
                                <CustomSelect
                                    label={"Estado Inicial"}
                                    name="state"
                                    value={formData.state}
                                    options={[
                                        { value: 1, label: "Pendiente" },
                                        { value: 2, label: "En Proceso" },
                                        { value: 3, label: "Finalizado" },
                                    ]}
                                    required={true}
                                    onChange={(value) => handleChange({ target: { name: 'state', value } })}
                                    className="mb-6"
                                />
                                 <Textarea
                                    label="Observaciones y Comentarios"
                                    name="observations"
                                    color="blue"
                                    value={formData.observations}
                                    onChange={(e) => handleChange(e)}
                                    resize={true}
                                    rows={6}
                                />
                            </div>

                            {/* Botones de acción */}
                            <FormActionButtons />
                        </form>
                    </CardBody>
                </Card>
            </div>
            
        </div>
    );
}

export default OrderForm;