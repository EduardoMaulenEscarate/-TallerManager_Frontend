import { useEffect, useState } from "react";
import api from "../api/api";
import { UserRoundPen, Plus, Eye, Pencil, Car, Calendar, Phone, Search, ChevronsUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    IconButton,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Chip,
    Badge,
    Progress,
    Select,
    Option,
} from "@material-tailwind/react";

import { useTable } from "../hooks/useTable";
import { useForm } from "../hooks/useForm";
import { useAnimation } from "../hooks/useAnimation";

const TABS = [
    {
        label: "Todos",
        value: "all",
    },
    /* {
        label: "Orden vigente",
        value: "monitored",
    },
    {
        label: "Orden no vigente",
        value: "unmonitored",
    }, */
];

const TABLE_HEAD = [
    { label: "Cliente", value: "nombre", type: "string" },
    { label: "Teléfono" },
    { label: "Vehículos", value: "vehiculos", type: "number" },
    { label: "Fecha creación", value: "fecha", type: "date" },
    { label: "Acciones", value: "" }
];

const ClientList = ({ setTitulo }) => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { searchTerm, sortField, filteredContent, expandedRows, activeTab,
        currentPage, itemsPerPage, totalPages, paginatedContent, pageNumbers,
        toggleExpandRow, handleSearch, handleSort, handleTabChange, goToPage, setItemsPerPage, setCurrentPage
    } = useTable({ content: clientes, TABLE_HEAD });
    const { formatDate } = useForm({});

    const { changePageAnimation } = useAnimation({});

    useEffect(() => {
        setTitulo('Lista Clientes');
        fetchClientes();
    }, []);



    const fetchClientes = async () => {
        setLoading(true);
        try {
            const response = await api.get('cliente/listarClientes');
            setClientes(response.data.clientes);
            setError(null);
        } catch (error) {
            console.error('Error al obtener clientes:', error);
            setError('Ocurrió un error al cargar los clientes. Por favor, intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 overflow-auto p-4 lg:p-6">
            <div className="max-w mt-6">
                <Card className="h-full w-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    Clientes
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    Vea el listado de todos los clientes
                                </Typography>
                            </div>
                            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                                <Button className="flex items-center gap-3" color="blue" size="sm" onClick={() => changePageAnimation('/clientes/agregar')}>
                                    <Plus size={16} /> Agregar cliente
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
                                    Cargando clientes...
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
                                    onClick={fetchClientes}
                                >
                                    Reintentar
                                </Button>
                            </div>
                        ) : paginatedContent.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-8">
                                <Typography color="blue-gray" className="text-center">
                                    No se encontraron clientes que coincidan con los criterios de búsqueda.
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
                                        ({ id, nombre, telefono, correo, autos, createdAt, ordenVigente }, index) => {
                                            const isLast = index === paginatedContent.length - 1;
                                            const classes = isLast
                                                ? "p-4"
                                                : "p-4 border-b border-blue-gray-50";

                                            const isExpanded = expandedRows[id];

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
                                                                            {nombre}
                                                                        </Typography>
                                                                        {ordenVigente && (
                                                                            <Badge color="green" content="" />
                                                                        )}
                                                                    </div>
                                                                    <Typography
                                                                        variant="small"
                                                                        color="blue-gray"
                                                                        className="font-normal opacity-70"
                                                                    >
                                                                        {correo || 'Sin correo'}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex items-center gap-2">
                                                                <Phone size={16} className="text-blue-gray-500" />
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                    {telefono}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex items-center gap-2">
                                                                <Car size={16} className="text-blue-gray-500" />
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                    {autos.length} vehículo(s)
                                                                </Typography>
                                                                <IconButton
                                                                    variant="text"
                                                                    size="sm"
                                                                    onClick={() => toggleExpandRow(id)}
                                                                >
                                                                    {isExpanded ?
                                                                        <ChevronsUpDown strokeWidth={2} className="h-4 w-4 rotate-180" /> :
                                                                        <ChevronsUpDown strokeWidth={2} className="h-4 w-4" />
                                                                    }
                                                                </IconButton>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex items-center gap-2">
                                                                <Calendar size={16} className="text-blue-gray-500" />
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                    {formatDate(createdAt)}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <Menu placement="bottom-end">
                                                                <MenuHandler>
                                                                    <IconButton variant="text">
                                                                        <UserRoundPen className="h-4 w-4" />
                                                                    </IconButton>
                                                                </MenuHandler>
                                                                <MenuList >
                                                                    <MenuItem className="flex items-center gap-2" onClick={() => (changePageAnimation(`/clientes/detalle/${id}`))}>
                                                                        <Eye className="h-4 w-4" />
                                                                        Ver detalles
                                                                    </MenuItem>
                                                                    <MenuItem className="flex items-center gap-2" onClick={() => (changePageAnimation(`/clientes/detalle/${id}`))}>
                                                                        <Pencil className="h-4 w-4" />
                                                                        Editar cliente
                                                                    </MenuItem>
                                                                    <MenuItem className="flex items-center gap-2" onClick={() => (changePageAnimation(`/clientes/detalle/${id}`))}>
                                                                        <Plus className="h-4 w-4" />
                                                                        Agregar vehículo
                                                                    </MenuItem>
                                                                </MenuList>
                                                            </Menu>
                                                        </td>
                                                    </tr>
                                                    {isExpanded && (
                                                        <tr className="bg-blue-gray-200">
                                                            <td colSpan={5} className="bg-blue-gray-50/30 px-4 py-2">
                                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-2 px-3">
                                                                    {autos.map((auto, i) => (
                                                                        <Card key={i} className="shadow-sm hover:scale-105 transition-all duration-300 ease-out">
                                                                            <CardBody className="p-3">
                                                                                <div className="flex justify-between items-center mb-2">
                                                                                    <Typography variant="h6">
                                                                                        {auto.detalle.marca_auto.nombre} {auto.detalle.modelo}
                                                                                    </Typography>
                                                                                    <Chip
                                                                                        value={auto.patente}
                                                                                        color="blue"
                                                                                        size="sm"
                                                                                    />
                                                                                </div>
                                                                                <div className="space-y-1">
                                                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                                                        <span className="font-medium">Año:</span> {auto.detalle.ano || 'No especificado'}
                                                                                    </Typography>
                                                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                                                        <span className="font-medium">Color:</span> {auto.detalle.color || 'No especificado'}
                                                                                    </Typography>
                                                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                                                        <span className="font-medium">Última visita:</span> {auto.ultima_visita ? formatDate(auto.ultima_visita) : 'Sin visitas'}
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

export default ClientList;