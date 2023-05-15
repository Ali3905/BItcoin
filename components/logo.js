import React from "react";
import { withRouter } from "next/router";
import Link from "next/link";

class Logo extends React.Component {
    render() {
        return (
            <div>
                <Link href={"/"} className="flexRow paragraph02 sitelogo"><img src={"/images/cttm-logo.png"} alt="Logo" width='60px' height='60px' className='mr-8' />Chiatothemoon
                </Link>
            </div>
        );
    }
}

export default withRouter(Logo);

