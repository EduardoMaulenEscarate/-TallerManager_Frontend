
import { useEffect, useState } from "react";
import api from "../api/api";
import { Plus,  Pencil, Car, Search, ChevronsUpDown, ChevronDown, ChevronLeft, ChevronRight, Puzzle, Stethoscope } from "lucide-react";
import React from "react";
import {
    Card, CardHeader, Input, Typography, Button, CardBody, CardFooter, Tabs, TabsHeader, Tab, 
    IconButton, Chip, Progress, Select, Option
} from "@material-tailwind/react";

import { useTable } from "../hooks/useTable";
import { useForm } from "../hooks/useForm";
import { useAnimation } from "../hooks/useAnimation";

const TABS = [{ label: "Todos", value: "all" }];

const TABLE_HEAD = [
    { label: "N°", value: "numero", type: "number" },
    { label: "Prioridad", value: "prioridad", type: "string" },
    { label: "Cliente", value: "nombre", type: "string" },
    { label: "Vehículo", value: "vehiculo", type: "number" },
    { label: "Repuestos"},
    { label: "Servicios"},
    { label: "Estado actual", value: "fecha", type: "date" },
    { label: "Fecha entrega estimada", value: "" },
    { label: "Acciones", value: "" }
];

const filterOptions = [
    {label: "Estados", prop: 'id_estado', options:[
        { label: "Pendiente", value: "1" },
        { label: "En revisión", value: "2" },
        { label: "Esperando repuestos", value: "3" },
        { label: "En progreso", value: "4" },
        { label: "Finalizado", value: "5" },
        { label: "Entregado", value: "6" },
        { label: "Cancelado", value: "7" },
        { label: "Facturado", value: "8" },
        { label: "Garantía", value: "9" },
        { label: "Retrasado", value: "10" },
    ]},
    {label: "Prioridades", prop: 'id_prioridad', options:[
        { label: "Baja", value: "1" },
        { label: "Media", value: "2" },
        { label: "Alta", value: "3" },
    ]},
]

/**
 * Componente `OrderList` que muestra una lista de órdenes con funcionalidades de búsqueda, 
 * paginación y visualización de detalles de repuestos y servicios asociados a cada orden.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.setTitulo - Función para establecer el título de la página.
 *
 * @description
 * Este componente utiliza varios hooks personalizados como `useTable`, `useForm` y `useAnimation` 
 * para manejar la lógica de búsqueda, paginación y animaciones de cambio de página. 
 *
 * @hook
 * - `useTable`: Maneja la lógica de búsqueda, ordenamiento, paginación y tabs.
 * - `useForm`: Proporciona utilidades como `formatDate` para formatear fechas.
 * - `useAnimation`: Maneja animaciones de cambio de página.
 *
 * @state
 * - `orders` {Array}: Lista de órdenes obtenidas desde la API.
 * - `loading` {boolean}: Indica si los datos están cargando.
 * - `error` {string|null}: Mensaje de error en caso de fallo al cargar los datos.
 * - `servicesExpandedRows` {Object}: Estado para manejar la expansión de filas de servicios.
 *
 * @function
 * - `fetchOrdenes`: Obtiene las órdenes desde la API.
 * - `toggleServicesExpandRow`: Alterna la expansión de filas para mostrar servicios asociados.
 * - `toggleExpandRow`: Alterna la expansión de filas para mostrar repuestos asociados.
 *
 * @dependencies
 * - `api`: Cliente para realizar solicitudes HTTP.
 */
const OrderList = ({ setTitulo }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [servicesExpandedRows, setServicesExpandedRows] = useState({});
    
    const { formatDate } = useForm({});
    const {
        searchTerm,
        sortField,
        filteredContent,
        expandedRows,
        activeTab,
        currentPage,
        itemsPerPage,
        totalPages,
        paginatedContent,
        pageNumbers,
        toggleExpandRow,
        handleSearch,
        handleSort,
        handleTabChange,
        goToPage,
        setItemsPerPage,
        setCurrentPage
    } = useTable({
        content: orders,
        TABLE_HEAD,
        filterOptions
    });
    

    const fetchOrdenes = async () => {
        setLoading(true);
        try {
            const response = await api.get('orden/');
            setOrders(response.data.orders);
            setError(null);
        } catch (error) {
            console.error('Error al obtener clientes:', error);
            setError('Ocurrió un error al cargar los clientes. Por favor, intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const { changePageAnimation } = useAnimation({});

    useEffect(() => {
        setTitulo('Lista Ordenes');
        fetchOrdenes();
    }, []);

    const toggleServicesExpandRow = (id) => {
        setServicesExpandedRows(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className="flex-1 overflow-auto p-4 lg:p-6">
            <div className="max-w mt-6">
                <Card className="h-full w-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    Ordenes
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    Vea el listado de todos las ordenes
                                </Typography>
                            </div>
                            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                                <Button className="flex items-center gap-3" color="blue" size="sm" onClick={() => changePageAnimation('/orden/agregar')}>
                                    <Plus size={16} /> Agregar Orden
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                            <Tabs value={activeTab} className="w-full md:w-max" onChange={handleTabChange}>
                                <TabsHeader>
                                    {TABS.map(({ label, value }) => (
                                        <Tab key={value} value={value} className="sm:min-w-40">
                                            &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                        </Tab>
                                    ))}
                                </TabsHeader>
                            </Tabs>
                            <div className="w-full md:w-72">
                                <Input
                                    label="Buscar"
                                    color="blue"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    icon={<Search className="h-5 w-5" />}
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className="overflow-scroll px-0">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-8">
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Cargando ordenes...
                                </Typography>
                                <Progress value={75} className="w-80" />
                            </div>
                        ) : error ? (
                            <div className="flex flex-col items-center justify-center py-8">
                                <Typography color="red" className="text-center">
                                    {error}
                                </Typography>
                                <Button
                                    variant="text"
                                    color="blue"
                                    className="mt-2"
                                    onClick={fetchOrdenes}
                                >
                                    Reintentar
                                </Button>
                            </div>
                        ) : paginatedContent.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-8">
                                <Typography color="blue-gray" className="text-center">
                                    No se encontraron ordenes que coincidan con los criterios de búsqueda.
                                </Typography>
                            </div>
                        ) : (
                            <table className="mt-4 w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        {TABLE_HEAD.map((head) => (
                                            <th
                                                key={head.label}
                                                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"

                                                onClick={() => head.value ? handleSort(head.value) : null}
                                            >
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                                >
                                                    {head.label}{" "}
                                                    {head.value && (
                                                        <ChevronsUpDown
                                                            strokeWidth={2}
                                                            className={`h-4 w-4 ${sortField === head.value ? "text-blue-500" : ""
                                                                }`}
                                                        />
                                                    )}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedContent.map(
                                        ({ id, numero_orden, autoCliente, fecha_entrega_estimada, prioridad_orden, fecha_ingreso, estadoOrden, id_prioridad, kilometraje, repuestos, servicios}, index) => {
                                            const isLast = index === paginatedContent.length - 1;
                                            const classes = isLast
                                                ? "p-4"
                                                : "p-4 border-b border-blue-gray-50";

                                            const isExpanded = expandedRows[id];
                                            const isServiceExpanded = servicesExpandedRows[id];
                                            
                                            return (
                                                <React.Fragment key={id}>
                                                    <tr className="hover:bg-blue-gray-50">
                                                        <td className={classes}>
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex flex-col">
                                                                    <div className="flex items-center gap-2">
                                                                        <Typography
                                                                            variant="small"
                                                                            color="blue-gray"
                                                                            className="font-medium"
                                                                        >
                                                                            {numero_orden}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex items-center gap-2">
                                                                <Chip
                                                                    value={ prioridad_orden.nombre }
                                                                    color={id_prioridad === 1 ? 'blue' : id_prioridad === 2 ? 'green' : 'red'}
                                                                    size="sm"
                                                                />
                                                            </div>
                                                        </td>

                                                        <td className={classes}>
                                                            <div className="flex items-center gap-2">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                        {autoCliente.cliente.nombre}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex items-center gap-2">
                                                                <Car size={24} className="text-blue-gray-500" />
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                        {autoCliente.detalle.marca_auto.nombre} {autoCliente.detalle.modelo} - {autoCliente.patente}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex items-center gap-2">
                                                                <Puzzle size={20} className="text-blue-gray-500" />
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                    {repuestos.length} repuesto(s)
                                                                </Typography>
                                                                <IconButton
                                                                    variant="text"
                                                                    size="sm"
                                                                    onClick={() => toggleExpandRow(id)}
                                                                >
                                                                    {isExpanded ?
                                                                        <ChevronDown strokeWidth={2} className="h-4 w-4 rotate-180" /> :
                                                                        <ChevronDown strokeWidth={2} className="h-4 w-4" />
                                                                    }
                                                                </IconButton>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex items-center gap-2">
                                                                <Stethoscope size={20} className="text-blue-gray-500" />
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                    {servicios.length} servicio(s)
                                                                </Typography>
                                                                <IconButton
                                                                    variant="text"
                                                                    size="sm"
                                                                    onClick={() => toggleServicesExpandRow(id)}
                                                                >
                                                                    {isServiceExpanded ?
                                                                        <ChevronDown strokeWidth={2} className="h-4 w-4 rotate-180" /> :
                                                                        <ChevronDown strokeWidth={2} className="h-4 w-4" />
                                                                    }
                                                                </IconButton>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex items-center gap-2">
                                                                <Chip
                                                                    value={estadoOrden.nombre}
                                                                    className={`
                                                                    ${estadoOrden.id === 1 ? "bg-gray-500 text-white" :
                                                                        estadoOrden.id === 2 ? "bg-blue-500 text-white" :
                                                                        estadoOrden.id === 3 ? "bg-yellow-400 text-black" :
                                                                        estadoOrden.id === 4 ? "bg-orange-500 text-white" :
                                                                        estadoOrden.id === 5 ? "bg-green-500 text-white" :
                                                                        estadoOrden.id === 6 ? "bg-teal-500 text-white" :
                                                                        estadoOrden.id === 7 ? "bg-red-500 text-white" :
                                                                        estadoOrden.id === 8 ? "bg-indigo-500 text-white" :
                                                                        estadoOrden.id === 9 ? "bg-purple-500 text-white" :
                                                                        estadoOrden.id === 10 ? "bg-pink-600 text-white" :
                                                                        ""
                                                                    }`}
                                                                    size="sm"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex items-center gap-2">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                    {formatDate(fecha_entrega_estimada)}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        
                                                        <td className={classes}>
                                                            <IconButton variant="text" onClick={() => (changePageAnimation(`/orden/detalle/${id}`))}>
                                                                <Pencil className="h-4 w-4" />
                                                            </IconButton>
                                                        </td>
                                                    </tr>
                                                    { isExpanded && (
                                                        <tr className="bg-blue-gray-200">
                                                            <td colSpan={9} className="bg-blue-gray-50/30 px-4 py-2">
                                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-2 px-3">
                                                                    {repuestos.map((repuesto, i) => (
                                                                        <Card key={i} className="shadow-sm hover:scale-105 transition-all duration-300 ease-out">
                                                                            <CardBody className="p-3">
                                                                                <div className="flex justify-between items-center mb-2">
                                                                                    <Typography variant="h6">
                                                                                        {repuesto.repuesto.nombre}
                                                                                    </Typography>
                                                                                    <Chip
                                                                                        value="Repuesto " 
                                                                                        color="blue"
                                                                                        size="sm"
                                                                                    />
                                                                                </div>
                                                                                <div className="space-y-1">
                                                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                                                        <span className="font-medium">Cantidad:</span> { repuesto.cantidad || 'No especificado'}
                                                                                    </Typography>
                                                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                                                        <span className="font-medium">Precio total:</span> ${ repuesto.precio_unitario * repuesto.cantidad || 'No especificado'}
                                                                                    </Typography>
                                                                                </div>
                                                                            </CardBody>
                                                                        </Card>
                                                                    ))}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}

                                                    { isServiceExpanded && (
                                                        <tr className="bg-blue-gray-200">
                                                            <td colSpan={9} className="bg-blue-gray-50/30 px-4 py-2">
                                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-2 px-3">
                                                                    {servicios.map((servicio, i) => (
                                                                        <Card key={i} className="shadow-sm hover:scale-105 transition-all duration-300 ease-out">
                                                                            <CardBody className="p-3">
                                                                                <div className="flex justify-between items-center mb-2">
                                                                                    <Typography variant="h6">
                                                                                        {servicio.servicio.nombre}
                                                                                    </Typography>
                                                                                    <Chip
                                                                                        value="Servicio " 
                                                                                        color="blue"
                                                                                        size="sm"
                                                                                    />
                                                                                </div>
                                                                                <div className="space-y-1">
                                                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                                                        <span className="font-medium">Precio total:</span> ${ servicio.precio || 'No especificado'}
                                                                                    </Typography>
                                                                                </div>
                                                                            </CardBody>
                                                                        </Card>
                                                                    ))}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            );
                                        }
                                    )}
                                </tbody>
                            </table>
                        )}
                    </CardBody>
                    <CardFooter className="flex flex-col md:flex-row items-center justify-between border-t border-blue-gray-50 p-4 gap-4">
                        <div className="flex items-center gap-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                Mostrar
                            </Typography>
                            <Select value={itemsPerPage.toString()} variant="standard" color="blue" onChange={(value) => {
                                setItemsPerPage(Number(value));
                                setCurrentPage(1);
                            }} className="w-full">
                                <Option value="5">5</Option>
                                <Option value="10">10</Option>
                                <Option value="25">25</Option>
                                <Option value="50">50</Option>
                            </Select>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                registros por página
                            </Typography>
                        </div>

                        {!loading && paginatedContent.length > 0 && (
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="text"
                                    size="sm"
                                    disabled={currentPage === 1}
                                    onClick={() => goToPage(currentPage - 1)}
                                >
                                    <ChevronLeft strokeWidth={2} className="h-4 w-4" />
                                </Button>

                                {pageNumbers.map(number => (
                                    <Button
                                        key={number}
                                        variant={currentPage === number ? "filled" : "text"}
                                        color={currentPage === number ? "blue" : "gray"}
                                        size="sm"
                                        onClick={() => goToPage(number)}
                                    >
                                        {number}
                                    </Button>
                                ))}

                                <Button
                                    variant="text"
                                    size="sm"
                                    disabled={currentPage === totalPages}
                                    onClick={() => goToPage(currentPage + 1)}
                                >
                                    <ChevronRight strokeWidth={2} className="h-4 w-4" />
                                </Button>
                            </div>
                        )}

                        <Typography variant="small" color="blue-gray" className="font-normal">
                            Mostrando {paginatedContent.length} de {filteredContent.length} registros
                        </Typography>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}


export default OrderList;