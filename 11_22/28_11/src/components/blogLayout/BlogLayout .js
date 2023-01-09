const BlogLayout = (props) => {
    console.log(props)
    return (
        <>
            <div className="bg-light py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1>
                                {props.title}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-8">
                        {props.children}
                    </div>
                    <div className="col-md-4">
                        Comments
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogLayout