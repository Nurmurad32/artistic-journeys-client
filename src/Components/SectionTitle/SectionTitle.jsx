
const SectionTitle = ({heading}) => {
    return (
        <div className="mx-auto text-center md:w-4/12 my-8">
            {/* <p className="text-yellow-600 mb-2">--- {subHeading} ---</p> */}
            
            <h3 className="text-3xl uppercase border-y-4 border-[#D05A32] py-4 text-[#f7a349]">{heading}</h3>
            
        </div>
    );
};

export default SectionTitle;