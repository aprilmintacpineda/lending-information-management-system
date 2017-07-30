import React, { Component } from 'react';

// components
import WithSidebar from '../components/WithSidebar';

export default class About extends Component {
  render() {
    return (
      <WithSidebar>
        <div className="about-wrapper">
          <section>
            <h1>Lending Management System</h1>
            <p>&copy; April Mintac Pineda.</p>
          </section>

          <section>
            <h1>End-User License Agreement ("Agreement")</h1>
            <p>Last updated: July 30, 2017</p>
            <p>Please read this End-user License Agreement ("Agreement") carefully.</p>

            <h3>Definition of terms</h3>
            <p><u>Software</u>, <u>the software</u>, or <u>this software</u>, in any case, refer to the <u>Lending Management System</u>.</p>
            <p><u>You</u>, in any case, refers to the <u>end user(s)</u> using the <u>Lending Management System</u>.</p>
            <p><u>The developer</u>, in any case, refers to <u>April Mintac Pineda</u>, the person who developed the <u>Lending Management System</u>.</p>

            <p>Because you installed this software and by using this software, you agree to the following terms.</p>
            <p>If you do not agree to this EULA, do not use the software and contact the developer.</p>

            <h3>License</h3>
            <p>The developer of the software, grants you a revocable, non­exclusive, non­transferable, limited license to install and use the software solely for your lending business strictly in accordance with the terms of this Agreement.</p>

            <h3>Restrictions</h3>
            <p>You agree not to, and you will not permit others to:</p>
            <p>a) license, sell, rent, lease, assign, distribute, transmit, host, outsource, disclose or otherwise commercially exploit the software or make the software available to any third party.</p>
            <p>b) Modify the system or any of its source codes.</p>

            <h3>Modifications to the software</h3>
            <p>The developer reserves the right to modify, suspend or discontinue, temporarily or permanently, the software or any service to which it connects, with or without notice and without liability to you</p>

            <h3>Term and termination</h3>
            <p>This Agreement shall remain in effect until terminated by you or by the developer.</p>
            <p>The developer may, in his sole discretion, at any time and for any or no reason, suspend or terminate this Agreement with or without prior notice.</p>
            <p>This Agreement will terminate immediately, without prior notice from the developer, in the event that you fail to comply with any provision of this Agreement. You may also terminate this Agreement by deleting the software and all copies thereof from your mobile device or from your desktop.</p>
            <p>Upon termination of this Agreement, you shall cease all use of the software and delete all copies of the software from your computer.</p>

            <h3>Severability</h3>
            <p>If any provision of this Agreement is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.</p>

            <h3>Amendments to this Agreement</h3>
            <p>The developer reserves the right, at its sole discretion, to modify or replace this Agreement at any time. The developer will provide at least 10 days' notice prior to any new terms taking effect.</p>

            <h3>Contact information</h3>
            <p>If you have any questions about this agreement, please contact the developer.</p>
          </section>
        </div>
      </WithSidebar>
    );
  }
}
