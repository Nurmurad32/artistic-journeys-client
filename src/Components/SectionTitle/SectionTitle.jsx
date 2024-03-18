
const SectionTitle = ({ heading }) => {
    return (
        <div className="m-0 w-8/12 md:w-6/12 mx-auto text-center my-8 flex justify-center">
            {/* <p className="text-yellow-600 mb-2">--- {subHeading} ---</p> */}

            {/* <div className=" text-center my-8 p-3"> */}
                <h3 className="text-xl md:text-3xl uppercase border-y-4 border-[#D05A32] py-4 text-[#f7a349] w-10/12">{heading}</h3>
            {/* </div> */}

        </div>
    );
};

export default SectionTitle;