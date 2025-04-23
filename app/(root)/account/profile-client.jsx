"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  User,
  Package,
  MapPin,
  CreditCard,
  Bell,
  LogOut,
  Check,
  X,
  AlertCircle,
  Edit2,
  ChevronRight,
  ShoppingBag,
  Heart,
  Clock,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Toast component
const Toast = ({ isVisible, message, type = "success", onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -20, x: "-50%" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="fixed top-6 left-1/2 z-50 transform -translate-x-1/2 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg"
          style={{
            backgroundColor: type === "success" ? "#10B981" : "#EF4444",
            color: "white",
            maxWidth: "calc(100% - 32px)",
          }}
        >
          <div className="flex items-center gap-2">
            {type === "success" ? (
              <Check size={18} className="text-white" />
            ) : (
              <AlertCircle size={18} className="text-white" />
            )}
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close notification"
          >
            <X size={16} className="text-white" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Tab interface
const ProfileTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "profile", label: "Profilo", icon: <User size={18} /> },
    { id: "orders", label: "Ordini", icon: <Package size={18} /> },
    { id: "addresses", label: "Indirizzi", icon: <MapPin size={18} /> },
    { id: "payment", label: "Pagamenti", icon: <CreditCard size={18} /> },
    { id: "notifications", label: "Notifiche", icon: <Bell size={18} /> },
  ];

  return (
    <div className="mb-8 border-b border-gray-200">
      <div className="flex overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// Profile content
const ProfileContent = ({
  user,
  profile,
  loading,
  handleUpdateProfile,
  showToast,
}) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.name || "",
    phone: profile?.phone || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleUpdateProfile(formData);
    if (success) {
      setEditing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin h-8 w-8 border-2 border-black border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-bold">Informazioni Personali</h3>
        {!editing && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setEditing(true)}
            className="text-sm flex items-center gap-1 text-gray-600 hover:text-black"
          >
            <Edit2 size={14} />
            Modifica
          </motion.button>
        )}
      </div>

      <div className="p-6">
        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="full_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nome completo
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={user?.email || ""}
                disabled
                className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                L'email non può essere modificata
              </p>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Telefono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-4 py-2 bg-black text-white font-medium text-sm rounded-md"
              >
                Salva Modifiche
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setEditing(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-medium text-sm rounded-md"
              >
                Annulla
              </motion.button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">
                Nome completo
              </h4>
              <p className="mt-1">{profile?.name || "Non specificato"}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Email</h4>
              <p className="mt-1">{user?.email}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Telefono</h4>
              <p className="mt-1">{profile?.phone || "Non specificato"}</p>
            </div>
          </div>
        )}
      </div>

      <div className="px-6 py-5 border-t border-gray-200 bg-gray-50">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Account creato il
        </h3>
        <p className="text-sm text-gray-600">
          {user?.createdAt
            ? new Date(user.createdAt).toLocaleDateString("it-IT")
            : "Data non disponibile"}
        </p>
      </div>
    </div>
  );
};

// Orders content
const OrdersContent = ({ orders, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin h-8 w-8 border-2 border-black border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Sample orders data
  const sampleOrders = [
    {
      id: "ORD-12345",
      date: "2023-11-15",
      status: "Consegnato",
      total: 245.9,
      items: 3,
    },
    {
      id: "ORD-12344",
      date: "2023-10-28",
      status: "In transito",
      total: 89.5,
      items: 1,
    },
    {
      id: "ORD-12343",
      date: "2023-09-05",
      status: "Consegnato",
      total: 167.8,
      items: 2,
    },
  ];

  const displayOrders = orders?.length > 0 ? orders : sampleOrders;

  const getStatusColor = (status) => {
    switch (status) {
      case "Consegnato":
        return "bg-green-100 text-green-800";
      case "In transito":
        return "bg-blue-100 text-blue-800";
      case "In elaborazione":
        return "bg-yellow-100 text-yellow-800";
      case "Annullato":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatPrice = (price) => {
    return `${price.toFixed(2).replace(".", ",")}€`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-bold">I tuoi ordini</h3>
      </div>

      {displayOrders.length === 0 ? (
        <div className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <Package size={48} className="text-gray-300" />
          </div>
          <h4 className="text-lg font-medium mb-2">Nessun ordine</h4>
          <p className="text-gray-500 mb-6">
            Non hai ancora effettuato ordini.
          </p>
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 bg-black text-white font-medium text-sm"
            >
              Inizia a fare acquisti
            </motion.button>
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {displayOrders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold">{order.id}</h4>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Ordinato il{" "}
                    {new Date(order.date).toLocaleDateString("it-IT")}
                  </p>
                </div>
                <div className="mt-3 sm:mt-0">
                  <p className="font-bold">{formatPrice(order.total)}</p>
                  <p className="text-sm text-gray-500">
                    {order.items} articoli
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Link href={`/orders/${order.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-sm font-medium flex items-center gap-1 text-black hover:underline"
                  >
                    Visualizza dettagli
                    <ChevronRight size={16} />
                  </motion.button>
                </Link>
                <Link href={`/orders/${order.id}/tracking`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-sm font-medium flex items-center gap-1 text-gray-600 hover:text-black"
                  >
                    <Clock size={14} />
                    Traccia ordine
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

// Addresses content
const AddressesContent = ({
  addresses,
  loading,
  handleAddAddress,
  handleDeleteAddress,
  showToast,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    postal_code: "",
    country: "Italia",
    is_default: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress({
      ...newAddress,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleAddAddress(newAddress);
    if (success) {
      setShowAddForm(false);
      setNewAddress({
        name: "",
        street: "",
        city: "",
        postal_code: "",
        country: "Italia",
        is_default: false,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin h-8 w-8 border-2 border-black border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Sample addresses data
  const sampleAddresses = [
    {
      id: 1,
      name: "Casa",
      street: "Via Roma 123",
      city: "Milano",
      postal_code: "20100",
      country: "Italia",
      is_default: true,
    },
    {
      id: 2,
      name: "Ufficio",
      street: "Via Dante 45",
      city: "Roma",
      postal_code: "00100",
      country: "Italia",
      is_default: false,
    },
  ];

  const displayAddresses = addresses?.length > 0 ? addresses : sampleAddresses;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-bold">I tuoi indirizzi</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-sm flex items-center gap-1 text-gray-600 hover:text-black"
        >
          <Plus size={14} />
          Aggiungi indirizzo
        </motion.button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-b border-gray-200"
          >
            <form onSubmit={handleSubmit} className="p-6 bg-gray-50">
              <h4 className="text-lg font-medium mb-4">Nuovo indirizzo</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nome indirizzo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newAddress.name}
                    onChange={handleChange}
                    placeholder="Es. Casa, Ufficio"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="street"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Via e numero civico
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={newAddress.street}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Città
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={newAddress.city}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="postal_code"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    CAP
                  </label>
                  <input
                    type="text"
                    id="postal_code"
                    name="postal_code"
                    value={newAddress.postal_code}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Paese
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={newAddress.country}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div className="md:col-span-2 flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="is_default"
                    name="is_default"
                    checked={newAddress.is_default}
                    onChange={handleChange}
                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                  />
                  <label
                    htmlFor="is_default"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Imposta come indirizzo predefinito
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-4 py-2 bg-black text-white font-medium text-sm rounded-md"
                >
                  Salva indirizzo
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 font-medium text-sm rounded-md"
                >
                  Annulla
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {displayAddresses.length === 0 ? (
        <div className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <MapPin size={48} className="text-gray-300" />
          </div>
          <h4 className="text-lg font-medium mb-2">Nessun indirizzo salvato</h4>
          <p className="text-gray-500 mb-6">
            Aggiungi un indirizzo per velocizzare il checkout.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-black text-white font-medium text-sm"
          >
            Aggiungi indirizzo
          </motion.button>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {displayAddresses.map((address) => (
            <motion.div
              key={address.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold">{address.name}</h4>
                  {address.is_default && (
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
                      Predefinito
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm text-gray-600 hover:text-black"
                  >
                    <Edit2 size={14} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteAddress(address.id)}
                    className="text-sm text-gray-600 hover:text-red-500"
                  >
                    <X size={14} />
                  </motion.button>
                </div>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{address.street}</p>
                <p>
                  {address.postal_code} {address.city}
                </p>
                <p>{address.country}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

// Payment methods content
const PaymentContent = ({ paymentMethods, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin h-8 w-8 border-2 border-black border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-bold">Metodi di pagamento</h3>
      </div>

      <div className="p-8 text-center">
        <div className="flex justify-center mb-4">
          <CreditCard size={48} className="text-gray-300" />
        </div>
        <h4 className="text-lg font-medium mb-2">Gestione pagamenti</h4>
        <p className="text-gray-500 mb-6">
          I tuoi metodi di pagamento sono gestiti in modo sicuro da Stripe.
        </p>
        <Link href="/payment-methods">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 bg-black text-white font-medium text-sm"
          >
            Gestisci metodi di pagamento
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

// Notifications content
const NotificationsContent = ({
  notifications,
  loading,
  handleUpdateNotifications,
  showToast,
}) => {
  const [settings, setSettings] = useState({
    order_updates: true,
    promotions: false,
    new_products: true,
    account_updates: true,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setSettings({
      ...settings,
      [name]: checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleUpdateNotifications(settings);
    if (success) {
      showToast("Preferenze di notifica aggiornate con successo", "success");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin h-8 w-8 border-2 border-black border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-bold">Preferenze di notifica</h3>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="font-medium">Aggiornamenti ordini</h4>
              <p className="text-sm text-gray-500">
                Ricevi notifiche sullo stato dei tuoi ordini
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="order_updates"
                checked={settings.order_updates}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-gray-100">
            <div>
              <h4 className="font-medium">Promozioni</h4>
              <p className="text-sm text-gray-500">
                Ricevi offerte speciali e sconti esclusivi
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="promotions"
                checked={settings.promotions}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-gray-100">
            <div>
              <h4 className="font-medium">Nuovi prodotti</h4>
              <p className="text-sm text-gray-500">
                Ricevi notifiche sui nuovi arrivi
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="new_products"
                checked={settings.new_products}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-gray-100">
            <div>
              <h4 className="font-medium">Aggiornamenti account</h4>
              <p className="text-sm text-gray-500">
                Ricevi notifiche su modifiche importanti al tuo account
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="account_updates"
                checked={settings.account_updates}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
            </label>
          </div>
        </div>

        <div className="mt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="px-4 py-2 bg-black text-white font-medium text-sm rounded-md"
          >
            Salva preferenze
          </motion.button>
        </div>
      </form>
    </div>
  );
};

// Main profile page component
export default function ProfileClient({ user }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Toast state
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });

    // Auto-hide toast after 4 seconds
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 4000);
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  const handleUpdateProfile = async (formData) => {
    try {
      setLoading(true);

      // In a real app, you would make an API call to update the user profile
      // Example:
      // const response = await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      showToast("Profilo aggiornato con successo", "success");
      return true;
    } catch (error) {
      console.error("Error updating profile:", error);
      showToast("Errore nell'aggiornamento del profilo", "error");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async (addressData) => {
    try {
      // In a real app, you would save this to your database
      showToast("Indirizzo aggiunto con successo", "success");
      return true;
    } catch (error) {
      console.error("Error adding address:", error);
      showToast("Errore nell'aggiunta dell'indirizzo", "error");
      return false;
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      // In a real app, you would delete this from your database
      showToast("Indirizzo rimosso con successo", "success");
      return true;
    } catch (error) {
      console.error("Error deleting address:", error);
      showToast("Errore nella rimozione dell'indirizzo", "error");
      return false;
    }
  };

  const handleUpdateNotifications = async (settings) => {
    try {
      // In a real app, you would save this to your database
      showToast("Preferenze di notifica aggiornate con successo", "success");
      return true;
    } catch (error) {
      console.error("Error updating notification settings:", error);
      showToast(
        "Errore nell'aggiornamento delle preferenze di notifica",
        "error"
      );
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/auth");
    } catch (error) {
      console.error("Error logging out:", error);
      showToast("Errore durante il logout", "error");
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileContent
            user={user}
            profile={user}
            loading={loading}
            handleUpdateProfile={handleUpdateProfile}
            showToast={showToast}
          />
        );
      case "orders":
        return <OrdersContent orders={[]} loading={loading} />;
      case "addresses":
        return (
          <AddressesContent
            addresses={[]}
            loading={loading}
            handleAddAddress={handleAddAddress}
            handleDeleteAddress={handleDeleteAddress}
            showToast={showToast}
          />
        );
      case "payment":
        return <PaymentContent paymentMethods={[]} loading={loading} />;
      case "notifications":
        return (
          <NotificationsContent
            notifications={[]}
            loading={loading}
            handleUpdateNotifications={handleUpdateNotifications}
            showToast={showToast}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Toast notification */}
      <Toast
        isVisible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />

      <main className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2 font-playfair">
              IL MIO ACCOUNT
            </h1>
            <p className="text-gray-600">
              Benvenuto{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <Link href="/wishlist">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-black"
              >
                <Heart size={16} />
                Wishlist
              </motion.button>
            </Link>

            <Link href="/cart">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-black"
              >
                <ShoppingBag size={16} />
                Carrello
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleLogout}
              className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-black"
            >
              <LogOut size={16} />
              Logout
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Mobile tabs */}
          <div className="lg:hidden">
            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Desktop sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden sticky top-8">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="relative w-[50px] h-[50px] rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {user?.image ? (
                      <Image
                        src={user.image || "/placeholder.svg"}
                        alt="Avatar"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <User size={24} className="text-gray-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold">{user?.name || "Utente"}</h3>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>
              </div>

              <div className="p-2">
                {[
                  "profile",
                  "orders",
                  "addresses",
                  "payment",
                  "notifications",
                ].map((tab) => {
                  const getTabIcon = (tab) => {
                    switch (tab) {
                      case "profile":
                        return <User size={18} />;
                      case "orders":
                        return <Package size={18} />;
                      case "addresses":
                        return <MapPin size={18} />;
                      case "payment":
                        return <CreditCard size={18} />;
                      case "notifications":
                        return <Bell size={18} />;
                      default:
                        return null;
                    }
                  };

                  const getTabLabel = (tab) => {
                    switch (tab) {
                      case "profile":
                        return "Profilo";
                      case "orders":
                        return "Ordini";
                      case "addresses":
                        return "Indirizzi";
                      case "payment":
                        return "Pagamenti";
                      case "notifications":
                        return "Notifiche";
                      default:
                        return tab;
                    }
                  };

                  return (
                    <motion.button
                      key={tab}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab(tab)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-md transition-colors ${
                        activeTab === tab
                          ? "bg-gray-100 text-black font-medium"
                          : "text-gray-600 hover:bg-gray-50 hover:text-black"
                      }`}
                    >
                      {getTabIcon(tab)}
                      {getTabLabel(tab)}
                    </motion.button>
                  );
                })}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-md text-gray-600 hover:bg-gray-50 hover:text-black transition-colors mt-2"
                >
                  <LogOut size={18} />
                  Logout
                </motion.button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
