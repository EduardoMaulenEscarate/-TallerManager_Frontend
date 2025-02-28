import { useState } from "react";

export const useTable = ({ content, TABLE_HEAD }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState("nombre");
    const [sortDirection, setSortDirection] = useState("asc");
    const [activeTab, setActiveTab] = useState("all");

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [expandedRows, setExpandedRows] = useState({});

    const toggleExpandRow = (id) => {
        setExpandedRows(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleTabChange = (value) => {
        setActiveTab(value);
        setCurrentPage(1);
    };

    // Función para obtener la configuración de ordenamiento para un campo específico
    const getSortConfig = (field) => {
        return TABLE_HEAD.find(head => head.value === field) || { type: "string" };
    };

    const filteredContent = content
        .filter((item) => {
            // funcion recursiva que convierte cualquier objeto anidado en arreglo de strings (result)
            const flattenObject = (obj) => {
                let result = [];
                for (const key in obj) {
                    if (typeof obj[key] === 'object' && obj[key] !== null) {
                        result = result.concat(flattenObject(obj[key]));
                    } else {
                        result.push(obj[key]);
                    }
                }
                return result;
            };

            const searchMatch = flattenObject(item)
                .map(value => Array.isArray(value) ? value.join(" ") : value)
                .join(" ")
                .toLowerCase()
                .includes(searchTerm.toLowerCase());


            if (activeTab === "all") return searchMatch;


        })
        .sort((a, b) => {
            // Obtener la configuración de ordenamiento para el campo actual
            const sortConfig = getSortConfig(sortField);
            const direction = sortDirection === "asc" ? 1 : -1;

            // Manejar propiedades anidadas
            const getNestedValue = (obj, path) => {
                if (path === "vehiculos") return obj.autos ? obj.autos.length : 0;
                if (path === "fecha") return obj.createdAt;

                const keys = path.split('.');
                return keys.reduce((o, key) => (o && o[key] !== undefined) ? o[key] : null, obj);
            };

            const valueA = getNestedValue(a, sortField);
            const valueB = getNestedValue(b, sortField);

            // Ordenar según el tipo de dato
            switch (sortConfig.type) {
                case "string":
                    return direction * String(valueA || "").localeCompare(String(valueB || ""));
                case "number":
                    return direction * ((valueA || 0) - (valueB || 0));
                case "date":
                    return direction * (new Date(valueA || 0) - new Date(valueB || 0));
                default:
                    return direction * String(valueA || "").localeCompare(String(valueB || ""));
            }
        });


    // Paginación
    const totalPages = Math.ceil(filteredContent.length / itemsPerPage);
    const paginatedContent = filteredContent.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const goToPage = (page) => {
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        setCurrentPage(page);
    };

    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return {
        toggleExpandRow, handleSort, handleSearch, handleTabChange, goToPage, setCurrentPage, setItemsPerPage,
        sortField, currentPage, itemsPerPage, sortDirection, expandedRows,
        searchTerm, activeTab, filteredContent, totalPages, paginatedContent, pageNumbers
    };
}
