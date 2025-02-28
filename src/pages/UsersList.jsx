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
    Option
} from "@material-tailwind/react";

import { useForm } from "../hooks/useForm";
import { useTable } from "../hooks/useTable";
import { useAnimation } from "../hooks/useAnimation";

const TABS = [
    {
        label: "Todos",
        value: "all",
    },
];

const TABLE_HEAD = [
    { label: "Username", value: "name", type: "string" },
    { label: "Nombre", value: "username", type: "string" },
    { label: "Tipo", value: "type", type: "string" },
    { label: "Telefono" },
    { label: "Fecha creación", value: "fecha", type: "date" },
    { label: "Acciones", value: "" }
];



const UsersList = ({ setTitulo }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { searchTerm, sortField, filteredContent, activeTab,
        currentPage, itemsPerPage, totalPages, paginatedContent, pageNumbers,
        handleSearch, handleSort, handleTabChange, goToPage, setItemsPerPage, setCurrentPage
    } = useTable({ content: usuarios, TABLE_HEAD });

    const { formatDate } = useForm({});

    const { changePageAnimation } = useAnimation({});


    useEffect(() => {
        setTitulo('Lista usuarios');
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        setLoading(true);
        try {
            const response = await api.get('usuario/listarUsuarios');
            console.log(response.data);

            setUsuarios(response.data.usuarios);
            console.log(response.data.usuarios);

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
                                    Usuarios
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    Vea el listado de todos los usuarios
                                </Typography>
                            </div>
                            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                                <Button className="flex items-center gap-3" color="blue" size="sm" onClick={() => changePageAnimation('/mecanicos/agregar')}>
                                    <Plus size={16} /> Agregar usuario
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
                                    Cargando usuarios...
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
                                    onClick={fetchUsuarios}
                                >
                                    Reintentar
                                </Button>
                            </div>
                        ) : paginatedContent.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-8">
                                <Typography color="blue-gray" className="text-center">
                                    No se encontraron usuarios que coincidan con los criterios de búsqueda.
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
                                        ({ id, name, lastname, username, email, address, phone, createdAt, created_by, type }, index) => {
                                            const isLast = index === paginatedContent.length - 1;
                                            const classes = isLast
                                                ? "p-4"
                                                : "p-4 border-b border-blue-gray-50";

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
                                                                            {username}
                                                                        </Typography>
                                                                    </div>
                                                                    <Typography
                                                                        variant="small"
                                                                        color="blue-gray"
                                                                        className="font-normal opacity-70"
                                                                    >
                                                                        {email || 'Sin correo'}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex items-center gap-2">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                    {name} {lastname}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex items-center gap-2">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                    {type}
                                                                </Typography>

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
                                                                    {phone}
                                                                </Typography>
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
                                                                    <MenuItem className="flex items-center gap-2" onClick={() => (changePageAnimation(`/mecanicos/detalle/${id}`))}>
                                                                        <Eye className="h-4 w-4" />
                                                                        Ver detalles
                                                                    </MenuItem>
                                                                    <MenuItem className="flex items-center gap-2" onClick={() => (changePageAnimation(`/mecanicos/detalle/${id}`))}>
                                                                        <Pencil className="h-4 w-4" />
                                                                        Editar cliente
                                                                    </MenuItem>
                                                                    <MenuItem className="flex items-center gap-2" onClick={() => (changePageAnimation(`/mecanicos/detalle/${id}`))}>
                                                                        <Plus className="h-4 w-4" />
                                                                        Agregar vehículo
                                                                    </MenuItem>
                                                                </MenuList>
                                                            </Menu>
                                                        </td>
                                                    </tr>

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

export default UsersList;