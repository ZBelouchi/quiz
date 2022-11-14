export default function Modal({open, children, modalClass}) {
    if (!open) return null
    return (
        <>
            <div className="modal-overlay"/>
            <div className={`modal ${modalClass}`}>
                {children}
            </div>
        </>
    )
}