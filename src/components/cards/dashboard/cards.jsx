import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaUsers, FaBuilding, FaBoxes, FaShoppingCart, FaTruck, FaFileInvoice, FaCreditCard, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Cards = ({ primaryColor, secondaryColor, count, value, currency, label, type = 'default', trend = 'up', trendValue = '12%' }) => {
    const navigate = useNavigate();

    // Define icons for different card types
    const getIcon = (cardType) => {
        switch (cardType) {
            case 'users':
                return <FaUsers className="w-6 h-6" />;
            case 'company':
                return <FaBuilding className="w-6 h-6" />;
            case 'inventory':
                return <FaBoxes className="w-6 h-6" />;
            case 'sales':
                return <FaShoppingCart className="w-6 h-6" />;
            case 'purchase':
                return <FaTruck className="w-6 h-6" />;
            case 'invoice':
                return <FaFileInvoice className="w-6 h-6" />;
            case 'credit':
                return <FaCreditCard className="w-6 h-6" />;
            default:
                return <FaChartLine className="w-6 h-6" />;
        }
    };

    const getTrendIcon = () => {
        if (trend === 'up') {
            return <FaArrowUp className="w-3 h-3 text-green-500" />;
        }
        return <FaArrowDown className="w-3 h-3 text-red-500" />;
    };

    const getTrendColor = () => {
        return trend === 'up' ? 'text-green-600' : 'text-red-600';
    };

    // Handle card click navigation
    const handleCardClick = () => {
        switch (type) {
            case 'users':
                navigate('/users');
                break;
            case 'company':
                navigate('/company');
                break;
            case 'inventory':
                navigate('/inventory-req');
                break;
            case 'sales':
                navigate('/sales-order');
                break;
            case 'purchase':
                navigate('/purchase-order');
                break;
            case 'invoice':
                navigate('/ap-invoice');
                break;
            case 'credit':
                navigate('/ap-credit-memo');
                break;
            default:
                console.log('Card type not implemented:', type);
        }
    };

    return (
        <div
            className="group relative bg-white rounded-xl p-6 shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 overflow-hidden cursor-pointer"
            onClick={handleCardClick}
            title={`Click to view ${label.toLowerCase()}`}
        >
            {/* Background decoration */}
            <div 
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 group-hover:opacity-10 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: primaryColor }}
            />
            
            {/* Header with icon and label */}
            <div className="relative z-10 flex items-center justify-between mb-4">
                <div 
                    className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-md"
                    style={{ 
                        backgroundColor: `${primaryColor}10`,
                        color: primaryColor 
                    }}
                >
                    {getIcon(type)}
                </div>
                <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                        {getTrendIcon()}
                        <span className={`text-xs font-medium ${getTrendColor()}`}>
                            {trendValue}
                        </span>
                    </div>
                    <span className="text-xs text-gray-500">vs last month</span>
                </div>
            </div>

            {/* Label */}
            <h3 
                className="relative z-10 font-semibold text-gray-700 mb-4 text-sm group-hover:text-gray-800 transition-colors duration-300"
            >
                {label}
            </h3>

            {/* Main content */}
            <div className="relative z-10 space-y-4">
                {/* Count and Value */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Count</p>
                        <p 
                            className="text-2xl font-bold transition-all duration-300 group-hover:scale-105"
                            style={{ color: primaryColor }}
                        >
                            {count}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Value</p>
                        <div className="flex items-center space-x-2">
                            <p 
                                className="text-2xl font-bold transition-all duration-300 group-hover:scale-105"
                                style={{ color: primaryColor }}
                            >
                                {value}
                            </p>
                            {currency && (
                                <span 
                                    className="text-xs px-2 py-1 rounded-full font-semibold transition-all duration-300 group-hover:scale-110"
                                    style={{
                                        backgroundColor: `${primaryColor}15`,
                                        color: primaryColor,
                                    }}
                                >
                                    {currency}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div 
                        className="h-2 rounded-full transition-all duration-1000 ease-out relative"
                        style={{ 
                            backgroundColor: primaryColor,
                            width: `${Math.min((parseInt(count.replace(/,/g, '')) / 100) * 100, 100)}%`
                        }}
                    >
                        <div className="absolute inset-0 bg-white opacity-20 rounded-full animate-pulse"></div>
                    </div>
                </div>

                {/* Footer stats */}
                <div className="flex justify-between text-xs text-gray-500 pt-2">
                    <span className="font-medium">Total Items</span>
                    <span className="font-medium">Total Value</span>
                </div>
            </div>

            {/* Hover effect overlay */}
            <div 
                className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl"
            />

            {/* Bottom accent line */}
            <div 
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:from-transparent group-hover:via-primary group-hover:to-transparent transition-all duration-300"
                style={{ '--tw-gradient-from': 'transparent', '--tw-gradient-via': primaryColor, '--tw-gradient-to': 'transparent' }}
            />

            {/* Click indicator */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                />
            </div>
        </div>
    );
};

export default Cards;