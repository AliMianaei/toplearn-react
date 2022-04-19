import React from 'react';

const Breadcrumb = () => {
    return (  
        <div className="container">
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">تاپ لرن</a></li>
                <li className="breadcrumb-item active" aria-current="page">ورود به سایت</li>
              </ul>
            </nav>
        </div>
    );
}
 
export default Breadcrumb;