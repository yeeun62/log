import "./Header.css";

function Header({ backgroudColor }) {
	return (
		<div className="log_box_header bold" style={{ background: backgroudColor }}>
			<p className="one">handleSystemId</p>
			<p className="two">logContent</p>
			<p className="three">logRegistTime</p>
			<p className="four">logID</p>
			<p className="five">logRequestIp</p>
			<p className="six">returnLogID</p>
			<p className="seven">addon</p>
		</div>
	);
}
export default Header;
