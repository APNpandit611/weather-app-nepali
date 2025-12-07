
const Spinner = () => {
    return (
        <div className="bg-black flex flex-col gap-3 items-center justify-center h-full">
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 pointer-events-none caret-black"></div>
        </div>
    );
};

export default Spinner;
