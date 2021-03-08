import "./Chart.css"

export default function EthChart() {

    const html = `<html lang="en"> <div class="tradingview-widget-container"> <div class="tradingview-widget-container__widget"></div> <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/ETHEUR/?exchange=KRAKEN" rel="noopener" target="_blank"><span class="blue-text">ETHEUR Rates</span></a> by TradingView</div> <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js" async> { "symbol": "KRAKEN:ETHEUR", "width": 350, "height": 220, "locale": "en", "dateRange": "1M", "colorTheme": "light", "trendLineColor": "#37a6ef", "underLineColor": "#E3F2FD", "isTransparent": false, "autosize": false, "largeChartUrl": "" } </script> </div> </html>`

    return(<iframe id="Chart" srcDoc={html} />);

}