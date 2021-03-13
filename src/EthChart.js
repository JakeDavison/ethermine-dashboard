import "./Chart.css"

export default function EthChart() {

    const html = `<html lang="en"> <div class="tradingview-widget-container"> <div class="tradingview-widget-container__widget"></div><script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js" async> { "symbol": "KRAKEN:ETHEUR", "width": 320, "height": 200, "locale": "en", "dateRange": "1D", "colorTheme": "light", "trendLineColor": "#37a6ef", "underLineColor": "#E3F2FD", "isTransparent": false, "autosize": false, "largeChartUrl": "" } </script> </div> </html>`

    return (
        <div className="chartContainer">
            <iframe id="Chart" srcDoc={html}/>
        </div>
    );

}