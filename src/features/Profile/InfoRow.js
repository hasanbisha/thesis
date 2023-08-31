function InfoRow({ label, value }) {
    return (
        <div className="grid grid-cols-2 gap-1 my-1">
            <span className="font-bold text-lg">{label}:</span>
            <span className="mx-2 text-lg">{value}</span>
        </div>
    );
}

export default InfoRow;