import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Save,
    X,
    AlertTriangle,
    Check,
    ChevronLeft,
    ChevronRight,
    Filter,
    Download,
    RefreshCw,
    MoreVertical,
    Eye,
    Upload
} from 'lucide-react';
import { uploadApi } from '@/lib/adminApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const CrudManager = ({
    title,
    icon: Icon,
    api,
    columns,
    formFields,
    searchField = 'title',
    defaultSort = 'createdAt',
    filterOptions = null
}) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});
    const [saving, setSaving] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const response = await api.getAll();
            setItems(response.data || []);
        } catch (error) {
            toast.error('Failed to fetch data');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    // Initialize form data
    const initializeFormData = (item = null) => {
        const data = {};
        formFields.forEach(field => {
            if (item) {
                data[field.name] = item[field.name] ?? field.defaultValue ?? '';
            } else {
                data[field.name] = field.defaultValue ?? '';
            }
        });
        return data;
    };

    // Handlers
    const handleAdd = () => {
        setEditingItem(null);
        setFormData(initializeFormData());
        setIsModalOpen(true);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData(initializeFormData(item));
        setIsModalOpen(true);
    };

    const handleDelete = (item) => {
        setItemToDelete(item);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;

        try {
            await api.delete(itemToDelete.id);
            toast.success('Item deleted successfully');
            fetchItems();
        } catch (error) {
            toast.error('Failed to delete item');
            console.error(error);
        } finally {
            setIsDeleteModalOpen(false);
            setItemToDelete(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            // Process form data - handle nested fields and type conversions
            const processedData = { ...formData };
            formFields.forEach(field => {
                if (field.type === 'number' && processedData[field.name]) {
                    processedData[field.name] = Number(processedData[field.name]);
                }
                if (field.type === 'checkbox') {
                    processedData[field.name] = Boolean(processedData[field.name]);
                }
            });

            if (editingItem) {
                await api.update(editingItem.id, processedData);
                toast.success('Item updated successfully');
            } else {
                await api.create(processedData);
                toast.success('Item created successfully');
            }

            setIsModalOpen(false);
            fetchItems();
        } catch (error) {
            toast.error(error.response?.data?.error || 'Operation failed');
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const handleInputChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Filtering and pagination
    const filteredItems = items.filter(item => {
        const matchesSearch = searchQuery === '' ||
            (item[searchField] && item[searchField].toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesFilter = selectedFilter === 'all' ||
            (filterOptions && item[filterOptions.field] === selectedFilter);

        return matchesSearch && matchesFilter;
    });

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const paginatedItems = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Render field input based on type
    const renderField = (field) => {
        const value = formData[field.name] ?? '';

        switch (field.type) {
            case 'textarea':
                return (
                    <textarea
                        value={value}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                        rows={field.rows || 4}
                        placeholder={field.placeholder}
                        required={field.required}
                    />
                );

            case 'select':
                return (
                    <select
                        value={value}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        required={field.required}
                    >
                        <option value="">Select {field.label}</option>
                        {field.options?.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                );

            case 'checkbox':
                return (
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handleInputChange(field.name, e.target.checked)}
                            className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-teal-500 focus:ring-teal-500"
                        />
                        <span className="text-slate-300">{field.checkboxLabel || field.label}</span>
                    </label>
                );

            case 'date':
                return (
                    <input
                        type="date"
                        value={value ? new Date(value).toISOString().split('T')[0] : ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        required={field.required}
                    />
                );

            case 'number':
                return (
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder={field.placeholder}
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        required={field.required}
                    />
                );

            case 'image':
                return (
                    <div className="space-y-3">
                        {value && (
                            <div className="relative w-full h-40 bg-slate-900/50 rounded-lg overflow-hidden border border-slate-600 flex items-center justify-center">
                                <img
                                    src={value.startsWith('http') ? value : `/${value.replace(/^(\/|puppeteer_assets\/)?/, 'puppeteer_assets/').replace(/\/+/g, '/')}`}
                                    alt="Preview"
                                    className="h-full w-full object-contain"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentElement.classList.add('flex', 'items-center', 'justify-center');
                                        e.target.parentElement.innerHTML = '<span class="text-slate-500">Image not found</span>';
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => handleInputChange(field.name, '')}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 rounded-full text-white transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                        <div className="flex items-center gap-3">
                            <input
                                type="file"
                                id={`file-${field.name}`}
                                className="hidden"
                                accept="image/*"
                                onChange={async (e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const toastId = toast.loading('Uploading image...');
                                        try {
                                            const res = await uploadApi.uploadImage(file);
                                            handleInputChange(field.name, res.data.url);
                                            toast.dismiss(toastId);
                                            toast.success('Image uploaded successfully');
                                        } catch (err) {
                                            toast.dismiss(toastId);
                                            toast.error('Upload failed');
                                            console.error(err);
                                        }
                                    }
                                }}
                            />
                            <label
                                htmlFor={`file-${field.name}`}
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg cursor-pointer transition-colors w-full border border-slate-600 border-dashed hover:border-solid hover:border-teal-500"
                            >
                                <Upload className="w-4 h-4" />
                                {value ? 'Change Image' : 'Upload Image'}
                            </label>
                        </div>
                        {field.hint && <p className="text-xs text-slate-500">{field.hint}</p>}
                    </div>
                );

            default:
                return (
                    <input
                        type={field.type || 'text'}
                        value={value}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder={field.placeholder}
                        required={field.required}
                    />
                );
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                    {Icon && (
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center">
                            <Icon className="w-6 h-6 text-white" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-2xl font-heading font-bold text-white">{title}</h1>
                        <p className="text-slate-400 text-sm">{filteredItems.length} items</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button
                        onClick={fetchItems}
                        disabled={loading}
                        className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                        <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                    <Button
                        onClick={handleAdd}
                        className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add New
                    </Button>
                </div>
            </div>

            {/* Search and Filter */}
            <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                }}
                                placeholder={`Search by ${searchField}...`}
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        {filterOptions && (
                            <div className="flex items-center gap-2">
                                <Filter className="w-5 h-5 text-slate-400" />
                                <select
                                    value={selectedFilter}
                                    onChange={(e) => {
                                        setSelectedFilter(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    <option value="all">All {filterOptions.label}</option>
                                    {filterOptions.options.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Data Table */}
            <Card className="bg-slate-800/50 border-slate-700/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-700/50">
                                {columns.map((col) => (
                                    <th
                                        key={col.key}
                                        className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider"
                                    >
                                        {col.label}
                                    </th>
                                ))}
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i}>
                                        {columns.map((col, j) => (
                                            <td key={j} className="px-6 py-4">
                                                <div className="h-4 bg-slate-700/50 rounded animate-pulse" />
                                            </td>
                                        ))}
                                        <td className="px-6 py-4">
                                            <div className="h-4 w-20 bg-slate-700/50 rounded animate-pulse ml-auto" />
                                        </td>
                                    </tr>
                                ))
                            ) : paginatedItems.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length + 1} className="px-6 py-12 text-center">
                                        <div className="text-slate-400">
                                            <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                            <p className="text-lg font-medium">No items found</p>
                                            <p className="text-sm">Try adjusting your search or add a new item</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                paginatedItems.map((item) => (
                                    <motion.tr
                                        key={item.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="hover:bg-slate-700/30 transition-colors"
                                    >
                                        {columns.map((col) => (
                                            <td key={col.key} className="px-6 py-4">
                                                {col.render ? (
                                                    col.render(item[col.key], item)
                                                ) : (
                                                    <span className="text-sm text-slate-300 line-clamp-2">
                                                        {item[col.key] || '-'}
                                                    </span>
                                                )}
                                            </td>
                                        ))}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEdit(item)}
                                                    className="text-slate-400 hover:text-teal-400 hover:bg-teal-500/10"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(item)}
                                                    className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-slate-700/50">
                        <p className="text-sm text-slate-400">
                            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                            {Math.min(currentPage * itemsPerPage, filteredItems.length)} of{' '}
                            {filteredItems.length} items
                        </p>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="text-slate-400 hover:text-white disabled:opacity-50"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            {[...Array(totalPages)].map((_, i) => (
                                <Button
                                    key={i}
                                    variant={currentPage === i + 1 ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={currentPage === i + 1
                                        ? "bg-teal-500 text-white"
                                        : "text-slate-400 hover:text-white"
                                    }
                                >
                                    {i + 1}
                                </Button>
                            )).slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="text-slate-400 hover:text-white disabled:opacity-50"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </Card>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 bg-black/60 z-50"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
                            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                            exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
                            className="fixed left-1/2 top-1/2 w-full max-w-2xl z-50"
                        >
                            <Card className="bg-slate-800 border-slate-700 max-h-[90vh] flex flex-col p-4">
                                <CardHeader className="flex flex-row items-center justify-between flex-shrink-0">
                                    <CardTitle className="text-white">
                                        {editingItem ? 'Edit Item' : 'Add New Item'}
                                    </CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setIsModalOpen(false)}
                                        className="text-slate-400 hover:text-white"
                                    >
                                        <X className="w-5 h-5" />
                                    </Button>
                                </CardHeader>
                                <CardContent className="overflow-y-auto flex-1">
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {formFields.map((field) => (
                                            <div key={field.name} className={field.fullWidth ? 'col-span-2' : ''}>
                                                {field.type !== 'checkbox' && (
                                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                                        {field.label}
                                                        {field.required && <span className="text-red-400 ml-1">*</span>}
                                                    </label>
                                                )}
                                                {renderField(field)}
                                                {field.hint && (
                                                    <p className="text-xs text-slate-500 mt-1">{field.hint}</p>
                                                )}
                                            </div>
                                        ))}
                                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                onClick={() => setIsModalOpen(false)}
                                                className="text-slate-400 hover:text-white"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={saving}
                                                className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white"
                                            >
                                                {saving ? (
                                                    <>
                                                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                                        Saving...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Save className="w-4 h-4 mr-2" />
                                                        {editingItem ? 'Update' : 'Create'}
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {isDeleteModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="fixed inset-0 bg-black/60 z-50"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
                            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                            exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
                            className="fixed left-1/2 top-1/2 w-full max-w-md z-50"
                        >
                            <Card className="bg-slate-800 border-slate-700 p-4">
                                <CardContent className="pt-6">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <AlertTriangle className="w-8 h-8 text-red-400" />
                                        </div>
                                        <h3 className="text-xl font-heading font-semibold text-white mb-2">
                                            Delete Item?
                                        </h3>
                                        <p className="text-slate-400 mb-6">
                                            Are you sure you want to delete this item? This action cannot be undone.
                                        </p>
                                        <div className="flex gap-3 justify-center">
                                            <Button
                                                variant="ghost"
                                                onClick={() => setIsDeleteModalOpen(false)}
                                                className="text-slate-400 hover:text-white"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={confirmDelete}
                                                className="bg-red-500 hover:bg-red-600 text-white"
                                            >
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CrudManager;
