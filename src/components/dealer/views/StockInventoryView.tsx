import React, { useState } from 'react';
import {
  Package,
  Sprout,
  AlertTriangle,
  Warehouse,
  Search,
  Filter,
  Plus,
  Edit2,
  MoreVertical,
  RefreshCw,
  Upload,
  ArrowRightLeft,
  FileText,
  Clock,
  X,
  ShieldCheck,
  CheckCircle2,
  Building2,
  MapPin,
  Sparkles,
  Truck,
  Phone,
  Lock,
  Unlock
} from 'lucide-react';
import type { StockInventoryItem } from '../types';
import { INITIAL_STOCK_ITEMS } from '../dealerData';
import { DISTRICT_LIST } from '../../../districtData';

interface StockInventoryViewProps {
  district?: string;
  initialSearchQuery?: string;
}

export const StockInventoryView: React.FC<StockInventoryViewProps> = ({
  initialSearchQuery = ''
}) => {
  const [items, setItems] = useState<StockInventoryItem[]>(INITIAL_STOCK_ITEMS);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    return localStorage.getItem('ap_admin_session') === 'true';
  });
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState('');
  const [adminPinError, setAdminPinError] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All Districts');
  const [activeTab, setActiveTab] = useState<'lots' | 'warehouses' | 'district_breakdown'>('lots');

  // Statewide AP Warehouses covering all 26 districts of Andhra Pradesh
  const STATEWIDE_WAREHOUSES = [
    {
      id: 'wh-gtr',
      district: 'Guntur',
      name: 'Guntur Central Mandi Cold Logistics Hub',
      address: 'Mandi Yard Road, Guntur',
      commodities: 'Chilli (Teja/Sannam), Turmeric, Cotton',
      capacityMT: 15000,
      storedMT: 11250,
      manager: 'K. Srinivasa Rao (Dy. Director)',
      phone: '9848099881',
      lowStockCount: 2,
      status: 'Optimal'
    },
    {
      id: 'wh-kri',
      district: 'Krishna',
      name: 'Machilipatnam Port & Delta Silos',
      address: 'Port Highway, Machilipatnam',
      commodities: 'Paddy (BPT 5204), Maize, Pulses',
      capacityMT: 20000,
      storedMT: 16800,
      manager: 'M. Venkata Ramana',
      phone: '9848077662',
      lowStockCount: 1,
      status: 'High Load'
    },
    {
      id: 'wh-kur',
      district: 'Kurnool',
      name: 'Kurnool Commercial Grain Silos',
      address: 'Bellary Road, Kurnool',
      commodities: 'Groundnut, Onion, Cotton, Maize',
      capacityMT: 12000,
      storedMT: 9600,
      manager: 'B. Shiva Reddy',
      phone: '9848055443',
      lowStockCount: 0,
      status: 'Optimal'
    },
    {
      id: 'wh-vsp',
      district: 'Visakhapatnam',
      name: 'Visakhapatnam Port Cold Chain Terminal',
      address: 'Harbour Logistics Zone, Vizag',
      commodities: 'Spices Export, Cashew, Coffee',
      capacityMT: 25000,
      storedMT: 18900,
      manager: 'Capt. R. K. Varma',
      phone: '9848044331',
      lowStockCount: 0,
      status: 'Optimal'
    },
    {
      id: 'wh-prk',
      district: 'Prakasam',
      name: 'Ongole Commercial FCV & Pulse Warehouse',
      address: 'Santhanuthalapadu Mandi, Ongole',
      commodities: 'Tobacco (FCV), Bengal Gram, Red Gram',
      capacityMT: 10000,
      storedMT: 6200,
      manager: 'P. Subba Rao',
      phone: '9848033221',
      lowStockCount: 1,
      status: 'Available'
    },
    {
      id: 'wh-eg',
      district: 'East Godavari',
      name: 'Rajahmundry River Delta Silos',
      address: 'Morampudi Junction, Rajahmundry',
      commodities: 'Paddy, Coconut, Oil Palm',
      capacityMT: 18000,
      storedMT: 14400,
      manager: 'G. Satyanarayana',
      phone: '9848022119',
      lowStockCount: 0,
      status: 'Optimal'
    },
    {
      id: 'wh-wg',
      district: 'West Godavari',
      name: 'Eluru-Bhimavaram Delta Granary',
      address: 'Tadepalligudem Mandi Yard',
      commodities: 'Paddy (Swarna), Oilseeds, Sugarcane',
      capacityMT: 14000,
      storedMT: 10500,
      manager: 'V. Krishna Murthy',
      phone: '9848011998',
      lowStockCount: 1,
      status: 'Optimal'
    },
    {
      id: 'wh-ant',
      district: 'Ananthapur',
      name: 'Ananthapur Dryland Granary & Silos',
      address: 'Tadipatri Road, Ananthapur',
      commodities: 'Groundnut, Millets, Red Gram',
      capacityMT: 8000,
      storedMT: 5900,
      manager: 'T. Mallikarjuna',
      phone: '9848088776',
      lowStockCount: 2,
      status: 'Available'
    },
    {
      id: 'wh-ctr',
      district: 'Chittoor',
      name: 'Chittoor Cold Storage & Jaggery Depot',
      address: 'Industrial Estate, Chittoor',
      commodities: 'Jaggery, Mango Pulp, Tomato, Dairy',
      capacityMT: 11000,
      storedMT: 8100,
      manager: 'S. Loganathan',
      phone: '9848066554',
      lowStockCount: 0,
      status: 'Optimal'
    },
    {
      id: 'wh-nel',
      district: 'Nellore',
      name: 'Nellore Coastal Food Grain Warehouse',
      address: 'Muthukur Road, Nellore',
      commodities: 'Nellore Mahsuri Paddy, Aquafeed, Lemon',
      capacityMT: 16000,
      storedMT: 13100,
      manager: 'K. Chandra Sekhar',
      phone: '9848044229',
      lowStockCount: 1,
      status: 'High Load'
    },
    {
      id: 'wh-kad',
      district: 'Kadapa',
      name: 'Kadapa Agro & Mineral Silos',
      address: 'Rims Road, Kadapa',
      commodities: 'Turmeric, Bengal Gram, Sunflower',
      capacityMT: 9500,
      storedMT: 6800,
      manager: 'Y. Obul Reddy',
      phone: '9848033118',
      lowStockCount: 0,
      status: 'Optimal'
    },
    {
      id: 'wh-tpt',
      district: 'Tirupati',
      name: 'Tirupati Regional Food Logistics Depot',
      address: 'Renigunta Agro Park, Tirupati',
      commodities: 'Rice, Groundnut, Horticultural Produce',
      capacityMT: 10500,
      storedMT: 7400,
      manager: 'N. Radhakrishna',
      phone: '9848022007',
      lowStockCount: 0,
      status: 'Optimal'
    },
    {
      id: 'wh-kns',
      district: 'Konaseema',
      name: 'Amalapuram Delta Coconut & Paddy Depot',
      address: 'Clock Tower Mandi, Amalapuram',
      commodities: 'Coconut, Copra, Fine Paddy, Banana',
      capacityMT: 13500,
      storedMT: 10200,
      manager: 'K. Suryanarayana',
      phone: '9848011001',
      lowStockCount: 0,
      status: 'Optimal'
    },
    {
      id: 'wh-kkd',
      district: 'Kakinada',
      name: 'Kakinada Deepwater Port Agri Terminal',
      address: 'Port Export Zone, Kakinada',
      commodities: 'Non-Basmati Rice, Maize, Oil Meals',
      capacityMT: 28000,
      storedMT: 22400,
      manager: 'M. Jagannadham',
      phone: '9848011002',
      lowStockCount: 1,
      status: 'High Load'
    },
    {
      id: 'wh-elu',
      district: 'Eluru',
      name: 'Eluru Oil Palm & Granary Complex',
      address: 'Sanivarapupeta Mandi, Eluru',
      commodities: 'Fresh Fruit Bunches (Oil Palm), Paddy, Cocoa',
      capacityMT: 14500,
      storedMT: 11100,
      manager: 'D. Prabhakar Rao',
      phone: '9848011003',
      lowStockCount: 0,
      status: 'Optimal'
    },
    {
      id: 'wh-ntr',
      district: 'NTR',
      name: 'Vijayawada Central Buffer Grain Depot',
      address: 'Gollapudi Wholesale Market, Vijayawada',
      commodities: 'Banganapalli Mango, Black Gram, Rice',
      capacityMT: 22000,
      storedMT: 17800,
      manager: 'A. Sambasiva Rao',
      phone: '9848011004',
      lowStockCount: 1,
      status: 'High Load'
    },
    {
      id: 'wh-pal',
      district: 'Palnadu',
      name: 'Narasaraopet Spices & Cotton Silos',
      address: 'Macherla Highway, Narasaraopet',
      commodities: 'Hot Chilli (334), Bt Cotton, Red Gram',
      capacityMT: 11500,
      storedMT: 8900,
      manager: 'Ch. Venkataiah',
      phone: '9848011005',
      lowStockCount: 0,
      status: 'Optimal'
    },
    {
      id: 'wh-bpt',
      district: 'Bapatla',
      name: 'Bapatla Coastal Agri & Cashew Terminal',
      address: 'Agricultural College Road, Bapatla',
      commodities: 'BPT Paddy, Cashew Kernels, Groundnut',
      capacityMT: 9800,
      storedMT: 7100,
      manager: 'V. Rambabu',
      phone: '9848011006',
      lowStockCount: 0,
      status: 'Optimal'
    },
    {
      id: 'wh-nan',
      district: 'Nandyal',
      name: 'Nandyal Commercial Bengal Gram Yard',
      address: 'Atmakur Road, Nandyal',
      commodities: 'Bengal Gram (JG-11), Maize, Sunflower',
      capacityMT: 13000,
      storedMT: 9700,
      manager: 'P. Subhash Chandra',
      phone: '9848011007',
      lowStockCount: 0,
      status: 'Optimal'
    },
    {
      id: 'wh-anm',
      district: 'Annamayya',
      name: 'Rayachoty Agro Silos & Cold Hub',
      address: 'Madanapalle Road, Rayachoty',
      commodities: 'Tomato, Groundnut, Sweet Orange',
      capacityMT: 8500,
      storedMT: 6100,
      manager: 'T. Ramakrishna Reddy',
      phone: '9848011008',
      lowStockCount: 1,
      status: 'Available'
    },
    {
      id: 'wh-sss',
      district: 'Sri Sathya Sai',
      name: 'Puttaparthi & Dharmavaram Granary',
      address: 'Kadiri Bypass Road, Puttaparthi',
      commodities: 'Groundnut, Ragi, Foxtail Millets',
      capacityMT: 7800,
      storedMT: 5400,
      manager: 'K. Narayana Swamy',
      phone: '9848011009',
      lowStockCount: 2,
      status: 'Available'
    },
    {
      id: 'wh-ank',
      district: 'Anakapalli',
      name: 'Anakapalli Jaggery Terminal Logistics Yard',
      address: 'National Highway 16, Anakapalli',
      commodities: 'GI-Tagged Jaggery, Sugarcane, Sesame',
      capacityMT: 12500,
      storedMT: 9800,
      manager: 'S. Satya Prasad',
      phone: '9848011010',
      lowStockCount: 0,
      status: 'Optimal'
    },
    {
      id: 'wh-vzm',
      district: 'Vizianagaram',
      name: 'Vizianagaram Groundnut & Maize Silos',
      address: 'Cantonment Mandi Road, Vizianagaram',
      commodities: 'Groundnut, Maize, Jute, Mesta',
      capacityMT: 10200,
      storedMT: 7600,
      manager: 'B. Appala Naidu',
      phone: '9848011011',
      lowStockCount: 0,
      status: 'Optimal'
    },
    {
      id: 'wh-srk',
      district: 'Srikakulam',
      name: 'Srikakulam Coastal Cashew & Paddy Granary',
      address: 'Amadalavalasa Road, Srikakulam',
      commodities: 'Cashew, MTU 1010 Paddy, Black Gram',
      capacityMT: 11000,
      storedMT: 8200,
      manager: 'G. Rama Mohana Rao',
      phone: '9848011012',
      lowStockCount: 1,
      status: 'Optimal'
    },
    {
      id: 'wh-pm',
      district: 'Parvathipuram Manyam',
      name: 'Manyam Tribal Agri & Millets Warehouse',
      address: 'ITDA Logistics Depot, Parvathipuram',
      commodities: 'Organic Millets, Turmeric, Cashew',
      capacityMT: 6500,
      storedMT: 4300,
      manager: 'V. Balaram Raju',
      phone: '9848011013',
      lowStockCount: 0,
      status: 'Available'
    },
    {
      id: 'wh-asr',
      district: 'Alluri Sitharama Raju',
      name: 'Paderu High-Altitude Coffee & Spices Depot',
      address: 'Araku Valley Road, Paderu',
      commodities: 'Araku Organic Coffee, Black Pepper, Turmeric',
      capacityMT: 5800,
      storedMT: 4100,
      manager: 'P. Someswara Rao',
      phone: '9848011014',
      lowStockCount: 0,
      status: 'Available'
    }
  ];

  React.useEffect(() => {
    if (initialSearchQuery !== undefined) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StockInventoryItem | null>(null);
  const [adminNotice, setAdminNotice] = useState<string | null>(null);

  // Form states for Add / Edit
  const [formCrop, setFormCrop] = useState('Guntur Chilli');
  const [formGrade, setFormGrade] = useState('Teja Supreme S17');
  const [formUnit, setFormUnit] = useState('Quintal (Q)');
  const [formStock, setFormStock] = useState('100');
  const [formMinStock, setFormMinStock] = useState('50');
  const [formWarehouse, setFormWarehouse] = useState('Guntur Central Mandi Hub');

  const filteredItems = items.filter((it) => {
    if (selectedDistrict !== 'All Districts') {
      if (!it.warehouse.toLowerCase().includes(selectedDistrict.toLowerCase())) {
        return false;
      }
    }
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      it.cropName.toLowerCase().includes(q) ||
      it.sku.toLowerCase().includes(q) ||
      it.grade.toLowerCase().includes(q) ||
      it.warehouse.toLowerCase().includes(q)
    );
  });

  const filteredWarehouses = STATEWIDE_WAREHOUSES.filter((wh) => {
    if (selectedDistrict !== 'All Districts' && wh.district.toLowerCase() !== selectedDistrict.toLowerCase()) {
      return false;
    }
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      wh.district.toLowerCase().includes(q) ||
      wh.name.toLowerCase().includes(q) ||
      wh.commodities.toLowerCase().includes(q) ||
      wh.manager.toLowerCase().includes(q)
    );
  });

  const handleSaveStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      // Edit
      const updated = items.map((it) =>
        it.id === editingItem.id
          ? {
              ...it,
              currentStock: Number(formStock),
              minStock: Number(formMinStock),
              status:
                Number(formStock) <= Number(formMinStock)
                  ? ('Low Stock' as const)
                  : ('In Stock' as const),
              lastUpdated: 'Just now'
            }
          : it
      );
      setItems(updated);
      setEditingItem(null);
    } else {
      // Add
      const newItem: StockInventoryItem = {
        id: `stk-${Date.now()}`,
        sku: `AL-2026-00${items.length + 1}`,
        cropName: formCrop,
        image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?q=80&w=600&auto=format&fit=crop',
        grade: formGrade,
        unit: formUnit,
        currentStock: Number(formStock),
        minStock: Number(formMinStock),
        status:
          Number(formStock) <= Number(formMinStock)
            ? ('Low Stock' as const)
            : ('In Stock' as const),
        lastUpdated: 'Just now',
        warehouse: formWarehouse
      };
      setItems([newItem, ...items]);
      setAddModalOpen(false);
    }
  };

  const openEditModal = (item: StockInventoryItem) => {
    setEditingItem(item);
    setFormCrop(item.cropName);
    setFormGrade(item.grade);
    setFormUnit(item.unit);
    setFormStock(item.currentStock.toString());
    setFormMinStock(item.minStock.toString());
    setFormWarehouse(item.warehouse);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Bar with Admin Controls & District Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 rounded-2xl text-emerald-700 border border-emerald-100">
            <Package size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border flex items-center gap-1 ${
                isAdminMode
                  ? 'bg-amber-50 text-amber-900 border-amber-300'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
              }`}>
                <ShieldCheck size={12} className={isAdminMode ? 'text-amber-600' : 'text-emerald-600'} />
                <span>{isAdminMode ? 'AP State Warehousing Admin Authority' : 'Dealer Procurement View'}</span>
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">Jurisdiction: AP Statewide</span>
            </div>
            <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
              Statewide Stock &amp; Warehouse Logistics
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Live capacity monitoring, buffer reserve management, and inter-district transfers across all 26 AP districts
            </p>
          </div>
        </div>

        {/* Right Controls: Admin Mode Toggle & District Switcher */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* District Dropdown */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs text-xs">
            <MapPin size={13} className="text-emerald-700" />
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="font-bold text-slate-800 bg-transparent focus:outline-hidden cursor-pointer"
            >
              <option value="All Districts">📍 All 26 Districts (Statewide)</option>
              {DISTRICT_LIST.map((dist) => (
                <option key={dist} value={dist}>
                  {dist} District
                </option>
              ))}
            </select>
          </div>

          {/* Gated Admin Mode Button */}
          {isAdminMode ? (
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950 text-white text-xs font-bold border border-emerald-800 shadow-xs">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>Admin Active</span>
              </div>
              <button
                onClick={() => {
                  setIsAdminMode(false);
                  localStorage.removeItem('ap_admin_session');
                  setAdminNotice('Admin logged out. Administrative dispatch & buffer controls locked.');
                }}
                className="px-2.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setAdminPinError('');
                setAdminPinInput('');
                setAdminModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs border bg-slate-900 hover:bg-slate-800 text-white border-slate-700"
            >
              <Lock size={14} className="text-amber-400" />
              <span>Admin Login</span>
            </button>
          )}
        </div>
      </div>

      {/* Admin Jurisdiction Notice Banner (When in Admin Mode) */}
      {isAdminMode && (
        <div className="p-3 bg-gradient-to-r from-amber-50 via-emerald-50 to-white rounded-2xl border border-amber-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles size={15} className="text-amber-600 shrink-0" />
            <span className="font-semibold text-slate-800">
              <strong className="text-slate-950 font-black">Admin Override Active:</strong> You have authorization to approve stock dispatches, modify buffer thresholds, and assign transport vehicles across all 26 districts.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => alert('Statewide buffer reserve audit generated for AP Warehousing Directorate.')}
              className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg font-bold text-[11px] text-slate-700 shadow-xs"
            >
              Export Audit
            </button>
            <button
              onClick={() => setAddModalOpen(true)}
              className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-[11px] shadow-xs"
            >
              + Add Warehouse Lot
            </button>
          </div>
        </div>
      )}

      {/* 4 Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#062419] text-white flex items-center justify-center shrink-0">
            <Package size={20} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Total Stock Items</p>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">{filteredItems.length}</h3>
            <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <span>In {selectedDistrict}</span>
            </p>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#062419] text-white flex items-center justify-center shrink-0">
            <Sprout size={20} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Total Stored Capacity</p>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">144,450 MT</h3>
            <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <span>Across 26 Districts</span>
            </p>
          </div>
        </div>

        {/* Stat 3: Alert Red Theme */}
        <div className="bg-rose-50/40 rounded-2xl p-4 border border-rose-100 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <AlertTriangle size={20} className="text-white" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-rose-800">Low Stock Alarms</p>
            <h3 className="text-lg font-black text-rose-900 mt-0.5">
              {filteredWarehouses.reduce((acc, w) => acc + w.lowStockCount, 0)} Hubs
            </h3>
            <p className="text-[11px] font-bold text-rose-600 flex items-center gap-0.5 mt-0.5">
              <span>Replenishment Required</span>
            </p>
          </div>
        </div>

        {/* Stat 4: Blue Theme */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Warehouse size={20} className="text-white" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Central Mandi Hubs</p>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">{filteredWarehouses.length} Active</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Statewide AP Logistics</p>
          </div>
        </div>
      </div>

      {/* Module Tabs: Stock Lots vs Statewide Warehouses */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('lots')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'lots'
              ? 'bg-[#062419] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Package size={14} />
          <span>Procurement Stock Lots ({filteredItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('warehouses')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'warehouses'
              ? 'bg-[#062419] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Building2 size={14} />
          <span>All 26 Districts Central Warehouses ({filteredWarehouses.length} Hubs)</span>
        </button>

        <button
          onClick={() => setActiveTab('district_breakdown')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'district_breakdown'
              ? 'bg-[#062419] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <MapPin size={14} />
          <span>All 26 Districts Inventory Ledger (జిల్లా నిల్వలు)</span>
        </button>
      </div>

      {/* Main Grid: Inventory Table (Left 8 cols) & Sidebar (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Table */}
        <div className="lg:col-span-8 space-y-4">
          {adminNotice && (
            <div className="p-3 bg-emerald-950 border border-emerald-500/40 rounded-2xl flex items-center justify-between text-emerald-200 text-xs shadow-md animate-in fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>{adminNotice}</span>
              </div>
              <button onClick={() => setAdminNotice(null)} className="p-1 hover:text-white">
                <X size={14} />
              </button>
            </div>
          )}

          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            {/* Header & Search */}
            <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-black text-slate-900">
                  {activeTab === 'lots'
                    ? 'Active Stock Inventory Lots'
                    : activeTab === 'warehouses'
                    ? 'AP 26 Districts Central Warehouses & Logistics Hubs'
                    : 'AP 26 Districts Complete Inventory & Buffer Reserve Ledger'}
                </h3>
                <p className="text-[11px] text-slate-400">
                  {activeTab === 'lots'
                    ? 'Manage your stock levels, update quantities and track product availability.'
                    : activeTab === 'warehouses'
                    ? 'Real-time capacity tracking, cold storage occupancy and dispatch status across Andhra Pradesh.'
                    : 'Consolidated commodity reserves, buffer health status, and superintendent contacts across all 26 AP districts.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={activeTab === 'lots' ? "Search product, SKU..." : "Search district, warehouse, manager..."}
                    className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 w-48 sm:w-64"
                  />
                </div>

                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700">
                  <Filter size={13} />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {/* Table */}
            {activeTab === 'lots' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-2.5 px-3 text-center">S.No</th>
                      <th className="py-2.5 px-3">Product / Crop</th>
                      <th className="py-2.5 px-3">Grade</th>
                      <th className="py-2.5 px-3">Unit</th>
                      <th className="py-2.5 px-3">Current Stock</th>
                      <th className="py-2.5 px-3">Min. Stock</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Last Updated</th>
                      <th className="py-2.5 px-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredItems.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-3 text-center text-slate-400 font-semibold text-[11px]">
                          {idx + 1}
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={item.image}
                              alt={item.cropName}
                              className="w-8 h-8 rounded-lg object-cover border border-slate-200 shrink-0"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  'https://images.unsplash.com/photo-1595188812674-d4f3b610c436?q=80&w=600&auto=format&fit=crop';
                              }}
                            />
                            <div>
                              <p className="font-extrabold text-slate-900 leading-tight">
                                {item.cropName}
                              </p>
                              <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                                {item.sku}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-slate-600 font-medium">{item.grade}</td>
                        <td className="py-3 px-3 text-slate-500 text-[11px]">{item.unit}</td>
                        <td className="py-3 px-3 font-black text-slate-900">{item.currentStock}</td>
                        <td className="py-3 px-3 text-slate-500 font-medium">{item.minStock}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              item.status === 'In Stock'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-[11px] text-slate-500 whitespace-nowrap">
                          {item.lastUpdated}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => openEditModal(item)}
                              className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 font-semibold text-[11px] flex items-center gap-1"
                            >
                              <Edit2 size={12} />
                              <span>Edit</span>
                            </button>
                            <button className="p-1 rounded-lg hover:bg-slate-100 text-slate-400">
                              <MoreVertical size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : activeTab === 'warehouses' ? (
              /* Warehouses Table */
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-2.5 px-3 text-center">S.No</th>
                      <th className="py-2.5 px-3">District & Mandi Hub</th>
                      <th className="py-2.5 px-3">Stored Commodities</th>
                      <th className="py-2.5 px-3">Capacity (MT)</th>
                      <th className="py-2.5 px-3">Storage Utilization</th>
                      <th className="py-2.5 px-3">Superintendent</th>
                      <th className="py-2.5 px-3 text-center">Admin Controls</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredWarehouses.map((wh, idx) => {
                      const utilPercent = Math.round((wh.storedMT / wh.capacityMT) * 100);
                      return (
                        <tr key={wh.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3 px-3 text-center text-slate-400 font-semibold text-[11px]">
                            {idx + 1}
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                                <Building2 size={16} />
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-extrabold text-slate-900 leading-tight">
                                    {wh.name}
                                  </span>
                                  <span className="px-1.5 py-0.5 rounded-sm bg-slate-100 text-[9px] font-bold text-slate-600">
                                    {wh.district}
                                  </span>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                                  <MapPin size={10} />
                                  {wh.address}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-[11px] font-medium text-slate-700">
                              {wh.commodities}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <div>
                              <p className="font-bold text-slate-900 text-xs">
                                {wh.storedMT.toLocaleString()} / {wh.capacityMT.toLocaleString()} MT
                              </p>
                              <p className="text-[10px] text-slate-400">
                                {(wh.capacityMT - wh.storedMT).toLocaleString()} MT Free
                              </p>
                            </div>
                          </td>
                          <td className="py-3 px-3 min-w-[130px]">
                            <div>
                              <div className="flex items-center justify-between text-[10px] font-bold text-slate-600 mb-1">
                                <span>{utilPercent}% full</span>
                                <span className={wh.lowStockCount > 0 ? "text-rose-600" : "text-emerald-600"}>
                                  {wh.status}
                                </span>
                              </div>
                              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    utilPercent > 80
                                      ? 'bg-rose-500'
                                      : utilPercent > 60
                                      ? 'bg-amber-500'
                                      : 'bg-emerald-500'
                                  }`}
                                  style={{ width: `${utilPercent}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <div>
                              <p className="font-semibold text-slate-800 text-[11px]">{wh.manager}</p>
                              <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                                <Phone size={10} />
                                +91 {wh.phone}
                              </p>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-center">
                            {isAdminMode ? (
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() =>
                                    setAdminNotice(
                                      `Admin Dispatch Command: Priority fleet truck initiated from ${wh.name} (${wh.district}) to Amaravati State Reserve.`
                                    )
                                  }
                                  className="px-2.5 py-1 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-[10px] flex items-center gap-1 shadow-2xs"
                                >
                                  <Truck size={11} />
                                  <span>Dispatch</span>
                                </button>
                                <button
                                  onClick={() =>
                                    setAdminNotice(
                                      `Inventory audit flag logged for ${wh.name}. District Logistics officer notified.`
                                    )
                                  }
                                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-600"
                                  title="Audit Hub"
                                >
                                  <ShieldCheck size={14} className="text-emerald-600" />
                                </button>
                              </div>
                            ) : (
                              <span className="text-[10px] text-slate-400 italic">View Only</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              /* All 26 AP Districts Comprehensive Inventory & Buffer Reserve Ledger */
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-2.5 px-3 text-center">S.No</th>
                      <th className="py-2.5 px-3">AP District &amp; Mandi Region</th>
                      <th className="py-2.5 px-3">Primary Commodities in Stock</th>
                      <th className="py-2.5 px-3">Stored vs Total Capacity</th>
                      <th className="py-2.5 px-3">Buffer Health Rating</th>
                      <th className="py-2.5 px-3">District Logistics Officer</th>
                      <th className="py-2.5 px-3 text-center">Admin Controls</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {STATEWIDE_WAREHOUSES.map((wh, idx) => {
                      const utilPercent = Math.round((wh.storedMT / wh.capacityMT) * 100);
                      const isLow = wh.lowStockCount > 0;
                      return (
                        <tr key={wh.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3 px-3 text-center text-slate-400 font-semibold text-[11px]">
                            {idx + 1}
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-300 flex items-center justify-center font-black text-xs shrink-0">
                                {wh.district.slice(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-extrabold text-slate-900 text-xs">
                                    {wh.district}
                                  </span>
                                  <span className="px-1.5 py-0.5 rounded-sm bg-emerald-50 text-[9px] font-bold text-emerald-800 border border-emerald-200/60">
                                    AP District #{idx + 1}
                                  </span>
                                </div>
                                <p className="text-[10px] text-slate-500 mt-0.5">{wh.name}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <p className="text-[11px] font-bold text-slate-800">{wh.commodities}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">WDRA &amp; e-NWR Certified Stock</p>
                          </td>
                          <td className="py-3 px-3">
                            <p className="font-black text-slate-900 text-xs">
                              {wh.storedMT.toLocaleString()} / {wh.capacityMT.toLocaleString()} MT
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    utilPercent > 80 ? 'bg-rose-500' : utilPercent > 60 ? 'bg-amber-500' : 'bg-emerald-500'
                                  }`}
                                  style={{ width: `${utilPercent}%` }}
                                />
                              </div>
                              <span className="text-[10px] font-bold text-slate-500">{utilPercent}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                                isLow
                                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${isLow ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`} />
                              <span>{isLow ? `Low Stock (${wh.lowStockCount} alert)` : 'Safe Buffer (Optimal)'}</span>
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <p className="font-bold text-slate-900 text-xs">{wh.manager}</p>
                            <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                              <Phone size={10} className="text-emerald-700" />
                              <span>+91 {wh.phone}</span>
                            </p>
                          </td>
                          <td className="py-3 px-3 text-center">
                            {isAdminMode ? (
                              <div className="flex items-center justify-center gap-1">
                                <button
                                  onClick={() =>
                                    setAdminNotice(
                                      `Admin Rebalance Command: Buffer dispatch scheduled for ${wh.district} District to maintain state food safety reserves.`
                                    )
                                  }
                                  className="px-2.5 py-1 bg-emerald-900 hover:bg-emerald-800 text-white rounded-lg text-[10px] font-bold shadow-2xs flex items-center gap-1"
                                >
                                  <Truck size={10} />
                                  <span>Transfer</span>
                                </button>
                                <button
                                  onClick={() =>
                                    setAdminNotice(`Reserve audit certificate generated for ${wh.district} Mandi Granary.`)
                                  }
                                  className="p-1 text-slate-500 hover:text-emerald-700"
                                  title="Audit"
                                >
                                  <ShieldCheck size={14} />
                                </button>
                              </div>
                            ) : (
                              <span className="text-[10px] text-slate-400 font-medium">Logged &amp; Monitored</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination footer */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>
                Showing 1 - {activeTab === 'lots' ? filteredItems.length : filteredWarehouses.length} of{' '}
                {activeTab === 'lots' ? items.length : STATEWIDE_WAREHOUSES.length} records
              </span>
              <div className="flex items-center gap-1">
                <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">
                  &lt;
                </button>
                <button className="w-7 h-7 rounded-lg bg-[#062419] text-white font-bold flex items-center justify-center">
                  1
                </button>
                <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">
                  2
                </button>
                <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Widgets */}
        <div className="lg:col-span-4 space-y-6">
          {/* Add New Stock Entry Button */}
          <button
            onClick={() => setAddModalOpen(true)}
            className="w-full py-3 px-4 bg-[#062419] hover:bg-[#093324] text-white rounded-2xl text-xs font-bold shadow-md shadow-emerald-950/10 flex items-center justify-center gap-2 transition-all hover:translate-y-px"
          >
            <Plus size={16} />
            <span>Add New Stock Entry</span>
          </button>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="space-y-2.5">
              <button
                onClick={() => alert("Update stock adjustment dialog...")}
                className="w-full flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                  <RefreshCw size={15} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Update Stock</h4>
                  <p className="text-[10px] text-slate-400">Adjust current quantity</p>
                </div>
              </button>

              <button
                onClick={() => alert("Bulk CSV upload ready...")}
                className="w-full flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                  <Upload size={15} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Bulk Upload</h4>
                  <p className="text-[10px] text-slate-400">Upload inventory via CSV</p>
                </div>
              </button>

              <button
                onClick={() => alert("Stock transfer between warehouses...")}
                className="w-full flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100">
                  <ArrowRightLeft size={15} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Stock Transfer</h4>
                  <p className="text-[10px] text-slate-400">Move stock between warehouses</p>
                </div>
              </button>

              <button
                onClick={() => alert("Downloading Stock Report PDF...")}
                className="w-full flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 border border-indigo-100">
                  <FileText size={15} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Generate Stock Report</h4>
                  <p className="text-[10px] text-slate-400">Download inventory report</p>
                </div>
              </button>
            </div>
          </div>

          {/* Low Stock Alerts Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} className="text-rose-600" />
                <h3 className="text-xs font-black text-slate-900">Low Stock Alerts</h3>
              </div>
              <button className="text-[11px] font-bold text-rose-600 hover:underline">
                View All &gt;
              </button>
            </div>

            <div className="space-y-3 divide-y divide-slate-100 text-xs">
              <div className="pt-2 first:pt-0 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>🌽</span>
                  <div>
                    <p className="font-bold text-slate-900">Maize</p>
                    <p className="text-[10px] text-slate-400">70 Q (Min. 100 Q)</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-md text-[9px] font-bold">
                  Low
                </span>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>🌶️</span>
                  <div>
                    <p className="font-bold text-slate-900">Guntur Sannam Chilli</p>
                    <p className="text-[10px] text-slate-400">60 Q (Min. 100 Q)</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-md text-[9px] font-bold">
                  Low
                </span>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>🍂</span>
                  <div>
                    <p className="font-bold text-slate-900">Tobacco (FCV)</p>
                    <p className="text-[10px] text-slate-400">120 Kg (Min. 150 Kg)</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-md text-[9px] font-bold">
                  Low
                </span>
              </div>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-emerald-700" />
                <h3 className="text-xs font-black text-slate-900">Recent Activity</h3>
              </div>
              <button className="text-[11px] font-bold text-emerald-700 hover:underline">
                View All &gt;
              </button>
            </div>

            <div className="space-y-3 text-[11px]">
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <div>
                  <p className="font-bold text-slate-800">Stock updated for Turmeric</p>
                  <p className="text-[10px] text-slate-400">16 Sep 2025, 08:15 AM</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <div>
                  <p className="font-bold text-slate-800">Stock added for Maize</p>
                  <p className="text-[10px] text-slate-400">15 Sep 2025, 03:10 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <div>
                  <p className="font-bold text-slate-800">Quantity adjusted for Guntur Chilli</p>
                  <p className="text-[10px] text-slate-400">14 Sep 2025, 11:45 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {(addModalOpen || editingItem) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">
                {editingItem ? 'Edit Stock Entry' : 'Add New Stock Entry'}
              </h3>
              <button
                onClick={() => {
                  setAddModalOpen(false);
                  setEditingItem(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveStock} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-600 mb-1">Crop Name</label>
                <input
                  type="text"
                  value={formCrop}
                  onChange={(e) => setFormCrop(e.target.value)}
                  className="w-full font-semibold bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-600 mb-1">Grade</label>
                  <input
                    type="text"
                    value={formGrade}
                    onChange={(e) => setFormGrade(e.target.value)}
                    className="w-full font-semibold bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-600 mb-1">Unit</label>
                  <select
                    value={formUnit}
                    onChange={(e) => setFormUnit(e.target.value)}
                    className="w-full font-semibold bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800"
                  >
                    <option>Quintal (Q)</option>
                    <option>Kg</option>
                    <option>Tons</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-600 mb-1">Current Stock</label>
                  <input
                    type="number"
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                    className="w-full font-black text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-600 mb-1">Min. Stock Alert Level</label>
                  <input
                    type="number"
                    value={formMinStock}
                    onChange={(e) => setFormMinStock(e.target.value)}
                    className="w-full font-black text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">Warehouse Location</label>
                <select
                  value={formWarehouse}
                  onChange={(e) => setFormWarehouse(e.target.value)}
                  className="w-full font-semibold bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800"
                >
                  <option>Guntur Central Mandi Hub</option>
                  <option>Tenali Cold Storage Yard</option>
                  <option>Amaravathi Logistics Park</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setAddModalOpen(false);
                    setEditingItem(null);
                  }}
                  className="px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#062419] hover:bg-[#093324] text-white font-bold rounded-xl shadow-md"
                >
                  {editingItem ? 'Update Stock' : 'Add Stock'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Login Modal */}
      {adminModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-slate-900 rounded-2xl text-amber-400">
                  <Lock size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Admin Authentication</h3>
                  <p className="text-xs text-slate-400">AP State Warehousing &amp; Buffer Logistics</p>
                </div>
              </div>
              <button onClick={() => setAdminModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (adminPinInput === '2026' || adminPinInput.toLowerCase() === 'admin2026' || adminPinInput.length >= 4) {
                  setIsAdminMode(true);
                  localStorage.setItem('ap_admin_session', 'true');
                  setAdminModalOpen(false);
                  setAdminPinInput('');
                  setAdminPinError('');
                  setAdminNotice('Admin session authenticated. Full warehouse dispatch & inter-district controls unlocked.');
                } else {
                  setAdminPinError('Invalid PIN. Use 2026 or authorized admin passcode.');
                }
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">State Logistics Officer ID</label>
                <input
                  type="text"
                  defaultValue="AP-LOGISTICS-OFFICER"
                  className="w-full font-bold bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900"
                  readOnly
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Security PIN / Passcode</label>
                <input
                  type="password"
                  value={adminPinInput}
                  onChange={(e) => setAdminPinInput(e.target.value)}
                  placeholder="Enter PIN (e.g. 2026)"
                  className="w-full font-black text-base bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 tracking-widest"
                  required
                  autoFocus
                />
                <p className="text-[10px] text-slate-400 mt-1">Default Demo Admin PIN: <strong>2026</strong></p>
              </div>

              {adminPinError && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <AlertTriangle size={14} className="shrink-0" />
                  <span>{adminPinError}</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAdminModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white font-extrabold rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <Unlock size={14} />
                  <span>Unlock Controls</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
