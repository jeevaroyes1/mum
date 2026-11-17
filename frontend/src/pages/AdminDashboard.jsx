import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  X,
  ArrowLeft,
  Clock,
  Mail,
  Phone,
  User,
  MessageSquare,
  AlertTriangle,
  Lock,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { isAuthenticated, adminUser, openAuthModal, logout } = useAuth();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal State: null | 'view' | 'edit' | 'create'
  const [activeModal, setActiveModal] = useState(null);
  const [currentEnquiry, setCurrentEnquiry] = useState(null);

  // Custom Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [enquiryToDelete, setEnquiryToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Form State for Create & Edit
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    status: 'New',
  });
  const [formErrors, setFormErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // 1. Fetch Enquiries from Backend (with optional search & status filter)
  const fetchEnquiries = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (statusFilter !== 'All') params.status = statusFilter;

      const response = await API.get('/enquiries', { params });
      if (response.data.success) {
        setEnquiries(response.data.data);
      }
    } catch (err) {
      console.error('Failed to load enquiries', err);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    if (isAuthenticated) {
      Promise.resolve().then(() => fetchEnquiries());
    }
  }, [fetchEnquiries, isAuthenticated]);

  // Open Create Modal
  const openCreateModal = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      status: 'New',
    });
    setFormErrors({});
    setServerError('');
    setCurrentEnquiry(null);
    setActiveModal('create');
  };

  // Open Edit Modal
  const openEditModal = (enquiry) => {
    setCurrentEnquiry(enquiry);
    setFormData({
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone,
      message: enquiry.message,
      status: enquiry.status || 'New',
    });
    setFormErrors({});
    setServerError('');
    setActiveModal('edit');
  };

  // Open View Modal
  const openViewModal = (enquiry) => {
    setCurrentEnquiry(enquiry);
    setActiveModal('view');
  };

  // Close any form or view modal
  const closeModal = () => {
    setActiveModal(null);
    setCurrentEnquiry(null);
    setFormErrors({});
    setServerError('');
  };

  // Open Custom Delete Modal
  const openDeleteModal = (enquiry) => {
    setEnquiryToDelete(enquiry);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setEnquiryToDelete(null);
    setDeleteModalOpen(false);
    setDeleting(false);
  };

  // Confirm Delete Action
  const confirmDelete = async () => {
    if (!enquiryToDelete) return;
    setDeleting(true);
    try {
      await API.delete(`/enquiries/${enquiryToDelete._id}`);
      closeDeleteModal();
      fetchEnquiries();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete enquiry');
      setDeleting(false);
    }
  };

  // Form Validation
  const validate = () => {
    const errors = {};
    if (!formData.name.trim() || formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    const cleanPhone = formData.phone.replace(/[\s\-().]/g, '');
    const indianPhoneRegex = /^[6-9][0-9]{9}$/;
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required.';
    } else if (!indianPhoneRegex.test(cleanPhone)) {
      errors.phone = 'Please enter a valid phone number.';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

// Save (Create or Update)
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  setSubmitting(true);
  setServerError('');

  try {
    const payload = {
      ...formData,
      phone: formData.phone.trim(),
    };

    if (activeModal === 'create') {
      await API.post('/enquiries', payload);
    } else if (activeModal === 'edit') {
      await API.put(`/enquiries/${currentEnquiry._id}`, payload);
    }
    closeModal();
    fetchEnquiries();
  } catch (err) {
    if (err.response?.data?.errors) {
      const beErrors = {};
      err.response.data.errors.forEach((e) => {
        beErrors[e.path || e.param] = e.msg;
      });
      setFormErrors(beErrors);
    } else {
      setServerError(err.response?.data?.message || 'Action failed.');
    }
  } finally {
    setSubmitting(false);
  }
};
  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return <span className="badge badge-new">New</span>;
      case 'In Progress':
        return <span className="badge badge-progress">In Progress</span>;
      case 'Resolved':
        return <span className="badge badge-resolved">Resolved</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-page">
        <div className="container">
          <div className="admin-header">
            <Link to="/" className="admin-back-link">
              <ArrowLeft size={16} /> Back to Website
            </Link>
          </div>
          <div className="admin-restricted-card">
            <div className="restricted-icon-circle">
              <Lock size={32} color="#00ACDF" />
            </div>
            <h2>Admin Authentication Required</h2>
            <p>
              This portal is restricted to authorized MUM agency personnel. Please log in to manage client enquiries.
            </p>
            <div className="auth-demo-hint" style={{ maxWidth: '420px', margin: '0 auto 1.75rem' }}>
              <Lock size={14} className="demo-lock-icon" />
              <span>Admin credentials: <strong>admin@mum.lu</strong> / <strong>admin123</strong></span>
            </div>
            <div className="restricted-btn-row">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => openAuthModal('login')}
              >
                <Lock size={16} /> Log In as Admin
              </button>
              <Link to="/" className="btn btn-outline">
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="container">
        {/* Top Header */}
        <div className="admin-header">
          <div>
            <Link to="/" className="admin-back-link">
              <ArrowLeft size={16} /> Back to Website
            </Link>
            <h1 className="admin-page-title">Enquiries Management</h1>
            <p className="admin-page-desc">
              Manage, filter, and track all client submissions from MUM Digital Agency.
            </p>
          </div>

          <div className="admin-header-actions">
            <div className="admin-user-pill">
              <span className="admin-user-status-dot"></span>
              <span className="admin-user-email">{adminUser?.email || 'admin@mum.lu'}</span>
            </div>
            <button
              type="button"
              className="btn btn-outline-cyan"
              onClick={openCreateModal}
            >
              <Plus size={18} /> Add New Entry
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={logout}
              title="Log out of admin session"
            >
              <LogOut size={16} /> Log Out
            </button>
          </div>
        </div>

        {/* Controls: Search & Filter */}
        <div className="admin-controls-card">
          <div className="admin-search-wrapper">
            <Search size={18} className="admin-search-icon" />
            <input
              type="text"
              placeholder="Search by client name, email, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-search-input"
            />
          </div>

          <div className="admin-filter-group">
            <label className="admin-filter-label">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="admin-filter-select"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Enquiries Table */}
        <div className="admin-table-container">
          {loading ? (
            <div className="admin-loading-state">
              Loading enquiries...
            </div>
          ) : enquiries.length === 0 ? (
            <div className="admin-empty-state">
              <MessageSquare size={44} className="empty-icon" />
              <h3>No enquiries found</h3>
              <p>
                {search || statusFilter !== 'All'
                  ? 'Try adjusting your search query or status filter.'
                  : 'Submit a form on the homepage or click "+ Add New Entry" above.'}
              </p>
            </div>
          ) : (
            <table className="admin-table">
              <colgroup>
                <col style={{ width: '16%' }} />
                <col style={{ width: '21%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '12%' }} />
                <col style={{ width: '14%' }} />
                <col style={{ width: '12%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Contact Information</th>
                  <th>Message Preview</th>
                  <th>Status</th>
                  <th>Submitted At</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <strong className="admin-client-name">{item.name}</strong>
                    </td>
                    <td>
                      <div className="admin-client-email">{item.email}</div>
                      <small className="admin-client-phone">{item.phone}</small>
                    </td>
                    <td>
                      <span className="admin-message-preview">
                        {item.message}
                      </span>
                    </td>
                    <td>{getStatusBadge(item.status)}</td>
                    <td className="admin-date-cell">
                      {new Date(item.createdAt).toLocaleDateString()}{' '}
                      {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td>
                      <div className="admin-action-row">
                        <button
                          type="button"
                          onClick={() => openViewModal(item)}
                          title="View Details"
                          className="admin-action-btn view-btn"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          title="Edit"
                          className="admin-action-btn edit-btn"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => openDeleteModal(item)}
                          title="Delete"
                          className="admin-action-btn delete-btn"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* MODAL 1: VIEW DETAILS */}
        {activeModal === 'view' && currentEnquiry && (
          <div className="admin-modal-backdrop" onClick={closeModal}>
            <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Enquiry Details</h3>
                <button type="button" onClick={closeModal} className="modal-close-icon">
                  <X size={20} />
                </button>
              </div>

              <div className="view-detail-list">
                <div className="view-detail-item">
                  <div className="detail-icon"><User size={18} /></div>
                  <div>
                    <small>Client Name</small>
                    <strong>{currentEnquiry.name}</strong>
                  </div>
                </div>

                <div className="view-detail-item">
                  <div className="detail-icon"><Mail size={18} /></div>
                  <div>
                    <small>Email Address</small>
                    <a href={`mailto:${currentEnquiry.email}`} className="detail-link">{currentEnquiry.email}</a>
                  </div>
                </div>

                <div className="view-detail-item">
                  <div className="detail-icon"><Phone size={18} /></div>
                  <div>
                    <small>Phone Number</small>
                    <a href={`tel:${currentEnquiry.phone}`} className="detail-link">{currentEnquiry.phone}</a>
                  </div>
                </div>

                <div className="view-detail-item">
                  <div className="detail-icon"><Clock size={18} /></div>
                  <div>
                    <small>Current Status</small>
                    <div>{getStatusBadge(currentEnquiry.status)}</div>
                  </div>
                </div>

                <div className="view-message-box">
                  <small>Message</small>
                  <p>{currentEnquiry.message}</p>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 2: ADD / EDIT ENTRY */}
        {(activeModal === 'create' || activeModal === 'edit') && (
          <div className="admin-modal-backdrop" onClick={closeModal}>
            <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{activeModal === 'create' ? 'Add New Enquiry' : 'Edit Enquiry'}</h3>
                <button type="button" onClick={closeModal} className="modal-close-icon">
                  <X size={20} />
                </button>
              </div>

              {serverError && (
                <div className="modal-error-alert">
                  {serverError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    placeholder="e.g. Jean Dupont"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  {formErrors.name && <div className="error-text">{formErrors.name}</div>}
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    placeholder="e.g. client@example.com"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {formErrors.email && <div className="error-text">{formErrors.email}</div>}
                </div>

                <div className="form-group">
                  <label>Phone Number (India +91) *</label>
                  <input
                    type="text"
                    placeholder="e.g. 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  {formErrors.phone && <div className="error-text">{formErrors.phone}</div>}
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="modal-select"
                  >
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    rows="3"
                    placeholder="Client enquiry details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                  {formErrors.message && <div className="error-text">{formErrors.message}</div>}
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-outline" onClick={closeModal} disabled={submitting}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? 'Saving...' : activeModal === 'create' ? 'Create Entry' : 'Update Entry'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 3: CUSTOM CARD POPUP TO CONFIRM DELETE (NO BROWSER PROMPT) */}
        {deleteModalOpen && enquiryToDelete && (
          <div className="admin-modal-backdrop" onClick={closeDeleteModal}>
            <div className="admin-modal-card delete-card-popup" onClick={(e) => e.stopPropagation()}>
              <div className="delete-icon-circle">
                <AlertTriangle size={32} color="#fb7185" />
              </div>

              <h3 className="delete-popup-title">Delete Enquiry</h3>
              <p className="delete-popup-desc">
                Are you sure you want to permanently delete the enquiry from{' '}
                <strong style={{ color: '#ffffff' }}>{enquiryToDelete.name}</strong>?
                <br />
                This action cannot be undone.
              </p>

              <div className="delete-popup-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={closeDeleteModal}
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger-delete"
                  onClick={confirmDelete}
                  disabled={deleting}
                >
                  {deleting ? 'Deleting...' : 'Delete Enquiry'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
