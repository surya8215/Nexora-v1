import React from 'react';
import { Trash2, ShieldAlert } from 'lucide-react';
import Modal from './Modal';

const DeleteConfirmModal = ({ 
  isOpen, 
  title = "Delete Item?", 
  description = "Are you sure you want to permanently delete this? This action cannot be undone.", 
  alertTitle = "Critical Action Alert",
  alertMessage = "Deleting this item will erase all of its data from the shared database permanently. This action is irreversible.",
  onCancel, 
  onConfirm 
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      size="sm"
      zIndex="z-[200]"
      showCloseButton={false}
      className="text-center space-y-5"
    >
      <div className="mx-auto h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-500 animate-pulse">
        <Trash2 className="h-6 w-6" />
      </div>
      
      <div className="space-y-1.5">
        <h3 className="text-base font-bold text-slate-100">{title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Warning alert warning block */}
      <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/25 text-red-200 text-[11px] leading-relaxed flex gap-2.5 items-start text-left">
        <ShieldAlert className="h-4.5 w-4.5 text-red-400 flex-shrink-0 mt-0.5 animate-bounce" />
        <div>
          <span className="font-bold text-red-300 block mb-0.5">{alertTitle}</span>
          {alertMessage}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl bg-slate-950 border border-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold transition"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="flex-1 py-2.5 rounded-xl bg-red-650 hover:bg-red-700 text-white text-xs font-semibold shadow-lg shadow-red-650/20 hover:shadow-red-650/30 transition active:scale-95"
        >
          Yes, Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
