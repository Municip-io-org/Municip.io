/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 63.0, "minX": 0.0, "maxY": 2469.0, "series": [{"data": [[0.0, 63.0], [0.1, 63.0], [0.2, 63.0], [0.3, 63.0], [0.4, 63.0], [0.5, 233.0], [0.6, 233.0], [0.7, 233.0], [0.8, 233.0], [0.9, 233.0], [1.0, 240.0], [1.1, 240.0], [1.2, 240.0], [1.3, 240.0], [1.4, 240.0], [1.5, 246.0], [1.6, 246.0], [1.7, 246.0], [1.8, 246.0], [1.9, 246.0], [2.0, 439.0], [2.1, 439.0], [2.2, 439.0], [2.3, 439.0], [2.4, 439.0], [2.5, 447.0], [2.6, 447.0], [2.7, 447.0], [2.8, 447.0], [2.9, 447.0], [3.0, 523.0], [3.1, 523.0], [3.2, 523.0], [3.3, 523.0], [3.4, 523.0], [3.5, 547.0], [3.6, 547.0], [3.7, 547.0], [3.8, 547.0], [3.9, 547.0], [4.0, 552.0], [4.1, 552.0], [4.2, 552.0], [4.3, 552.0], [4.4, 552.0], [4.5, 567.0], [4.6, 567.0], [4.7, 567.0], [4.8, 567.0], [4.9, 567.0], [5.0, 601.0], [5.1, 601.0], [5.2, 601.0], [5.3, 601.0], [5.4, 601.0], [5.5, 606.0], [5.6, 606.0], [5.7, 606.0], [5.8, 606.0], [5.9, 606.0], [6.0, 611.0], [6.1, 611.0], [6.2, 611.0], [6.3, 611.0], [6.4, 611.0], [6.5, 612.0], [6.6, 612.0], [6.7, 612.0], [6.8, 612.0], [6.9, 612.0], [7.0, 615.0], [7.1, 615.0], [7.2, 615.0], [7.3, 615.0], [7.4, 615.0], [7.5, 624.0], [7.6, 624.0], [7.7, 624.0], [7.8, 624.0], [7.9, 624.0], [8.0, 626.0], [8.1, 626.0], [8.2, 626.0], [8.3, 626.0], [8.4, 626.0], [8.5, 633.0], [8.6, 633.0], [8.7, 633.0], [8.8, 633.0], [8.9, 633.0], [9.0, 634.0], [9.1, 634.0], [9.2, 634.0], [9.3, 634.0], [9.4, 634.0], [9.5, 639.0], [9.6, 639.0], [9.7, 639.0], [9.8, 639.0], [9.9, 639.0], [10.0, 644.0], [10.1, 644.0], [10.2, 644.0], [10.3, 644.0], [10.4, 644.0], [10.5, 646.0], [10.6, 646.0], [10.7, 646.0], [10.8, 646.0], [10.9, 646.0], [11.0, 649.0], [11.1, 649.0], [11.2, 649.0], [11.3, 649.0], [11.4, 649.0], [11.5, 654.0], [11.6, 654.0], [11.7, 654.0], [11.8, 654.0], [11.9, 654.0], [12.0, 658.0], [12.1, 658.0], [12.2, 658.0], [12.3, 658.0], [12.4, 658.0], [12.5, 664.0], [12.6, 664.0], [12.7, 664.0], [12.8, 664.0], [12.9, 664.0], [13.0, 672.0], [13.1, 672.0], [13.2, 672.0], [13.3, 672.0], [13.4, 672.0], [13.5, 680.0], [13.6, 680.0], [13.7, 680.0], [13.8, 680.0], [13.9, 680.0], [14.0, 686.0], [14.1, 686.0], [14.2, 686.0], [14.3, 686.0], [14.4, 686.0], [14.5, 690.0], [14.6, 690.0], [14.7, 690.0], [14.8, 690.0], [14.9, 690.0], [15.0, 696.0], [15.1, 696.0], [15.2, 696.0], [15.3, 696.0], [15.4, 696.0], [15.5, 700.0], [15.6, 700.0], [15.7, 700.0], [15.8, 700.0], [15.9, 700.0], [16.0, 704.0], [16.1, 704.0], [16.2, 704.0], [16.3, 704.0], [16.4, 704.0], [16.5, 706.0], [16.6, 706.0], [16.7, 706.0], [16.8, 706.0], [16.9, 706.0], [17.0, 711.0], [17.1, 711.0], [17.2, 711.0], [17.3, 711.0], [17.4, 711.0], [17.5, 716.0], [17.6, 716.0], [17.7, 716.0], [17.8, 716.0], [17.9, 716.0], [18.0, 719.0], [18.1, 719.0], [18.2, 719.0], [18.3, 719.0], [18.4, 719.0], [18.5, 723.0], [18.6, 723.0], [18.7, 723.0], [18.8, 723.0], [18.9, 723.0], [19.0, 731.0], [19.1, 731.0], [19.2, 731.0], [19.3, 731.0], [19.4, 731.0], [19.5, 839.0], [19.6, 839.0], [19.7, 839.0], [19.8, 839.0], [19.9, 839.0], [20.0, 958.0], [20.1, 958.0], [20.2, 958.0], [20.3, 958.0], [20.4, 958.0], [20.5, 960.0], [20.6, 960.0], [20.7, 960.0], [20.8, 960.0], [20.9, 960.0], [21.0, 965.0], [21.1, 965.0], [21.2, 965.0], [21.3, 965.0], [21.4, 965.0], [21.5, 970.0], [21.6, 970.0], [21.7, 970.0], [21.8, 970.0], [21.9, 970.0], [22.0, 973.0], [22.1, 973.0], [22.2, 973.0], [22.3, 973.0], [22.4, 973.0], [22.5, 974.0], [22.6, 974.0], [22.7, 974.0], [22.8, 974.0], [22.9, 974.0], [23.0, 978.0], [23.1, 978.0], [23.2, 978.0], [23.3, 978.0], [23.4, 978.0], [23.5, 982.0], [23.6, 982.0], [23.7, 982.0], [23.8, 982.0], [23.9, 982.0], [24.0, 987.0], [24.1, 987.0], [24.2, 987.0], [24.3, 987.0], [24.4, 987.0], [24.5, 989.0], [24.6, 989.0], [24.7, 989.0], [24.8, 989.0], [24.9, 989.0], [25.0, 993.0], [25.1, 993.0], [25.2, 993.0], [25.3, 993.0], [25.4, 993.0], [25.5, 999.0], [25.6, 999.0], [25.7, 999.0], [25.8, 999.0], [25.9, 999.0], [26.0, 1003.0], [26.1, 1003.0], [26.2, 1003.0], [26.3, 1003.0], [26.4, 1003.0], [26.5, 1008.0], [26.6, 1008.0], [26.7, 1008.0], [26.8, 1008.0], [26.9, 1008.0], [27.0, 1013.0], [27.1, 1013.0], [27.2, 1013.0], [27.3, 1013.0], [27.4, 1013.0], [27.5, 1016.0], [27.6, 1016.0], [27.7, 1016.0], [27.8, 1016.0], [27.9, 1016.0], [28.0, 1019.0], [28.1, 1019.0], [28.2, 1019.0], [28.3, 1019.0], [28.4, 1019.0], [28.5, 1027.0], [28.6, 1027.0], [28.7, 1027.0], [28.8, 1027.0], [28.9, 1027.0], [29.0, 1038.0], [29.1, 1038.0], [29.2, 1038.0], [29.3, 1038.0], [29.4, 1038.0], [29.5, 1045.0], [29.6, 1045.0], [29.7, 1045.0], [29.8, 1045.0], [29.9, 1045.0], [30.0, 1049.0], [30.1, 1049.0], [30.2, 1049.0], [30.3, 1049.0], [30.4, 1049.0], [30.5, 1057.0], [30.6, 1057.0], [30.7, 1057.0], [30.8, 1057.0], [30.9, 1057.0], [31.0, 1062.0], [31.1, 1062.0], [31.2, 1062.0], [31.3, 1062.0], [31.4, 1062.0], [31.5, 1068.0], [31.6, 1068.0], [31.7, 1068.0], [31.8, 1068.0], [31.9, 1068.0], [32.0, 1071.0], [32.1, 1071.0], [32.2, 1071.0], [32.3, 1071.0], [32.4, 1071.0], [32.5, 1075.0], [32.6, 1075.0], [32.7, 1075.0], [32.8, 1075.0], [32.9, 1075.0], [33.0, 1080.0], [33.1, 1080.0], [33.2, 1080.0], [33.3, 1080.0], [33.4, 1080.0], [33.5, 1084.0], [33.6, 1084.0], [33.7, 1084.0], [33.8, 1084.0], [33.9, 1084.0], [34.0, 1092.0], [34.1, 1092.0], [34.2, 1092.0], [34.3, 1092.0], [34.4, 1092.0], [34.5, 1100.0], [34.6, 1100.0], [34.7, 1100.0], [34.8, 1100.0], [34.9, 1100.0], [35.0, 1107.0], [35.1, 1107.0], [35.2, 1107.0], [35.3, 1107.0], [35.4, 1107.0], [35.5, 1246.0], [35.6, 1246.0], [35.7, 1246.0], [35.8, 1246.0], [35.9, 1246.0], [36.0, 1253.0], [36.1, 1253.0], [36.2, 1253.0], [36.3, 1253.0], [36.4, 1253.0], [36.5, 1256.0], [36.6, 1256.0], [36.7, 1256.0], [36.8, 1256.0], [36.9, 1256.0], [37.0, 1262.0], [37.1, 1262.0], [37.2, 1262.0], [37.3, 1262.0], [37.4, 1262.0], [37.5, 1266.0], [37.6, 1266.0], [37.7, 1266.0], [37.8, 1266.0], [37.9, 1266.0], [38.0, 1270.0], [38.1, 1270.0], [38.2, 1270.0], [38.3, 1270.0], [38.4, 1270.0], [38.5, 1272.0], [38.6, 1272.0], [38.7, 1272.0], [38.8, 1272.0], [38.9, 1272.0], [39.0, 1277.0], [39.1, 1277.0], [39.2, 1277.0], [39.3, 1277.0], [39.4, 1277.0], [39.5, 1282.0], [39.6, 1282.0], [39.7, 1282.0], [39.8, 1282.0], [39.9, 1282.0], [40.0, 1285.0], [40.1, 1285.0], [40.2, 1285.0], [40.3, 1285.0], [40.4, 1285.0], [40.5, 1290.0], [40.6, 1290.0], [40.7, 1290.0], [40.8, 1290.0], [40.9, 1290.0], [41.0, 1300.0], [41.1, 1300.0], [41.2, 1300.0], [41.3, 1300.0], [41.4, 1300.0], [41.5, 1306.0], [41.6, 1306.0], [41.7, 1306.0], [41.8, 1306.0], [41.9, 1306.0], [42.0, 1315.0], [42.1, 1315.0], [42.2, 1315.0], [42.3, 1315.0], [42.4, 1315.0], [42.5, 1321.0], [42.6, 1321.0], [42.7, 1321.0], [42.8, 1321.0], [42.9, 1321.0], [43.0, 1326.0], [43.1, 1326.0], [43.2, 1326.0], [43.3, 1326.0], [43.4, 1326.0], [43.5, 1331.0], [43.6, 1331.0], [43.7, 1331.0], [43.8, 1331.0], [43.9, 1331.0], [44.0, 1337.0], [44.1, 1337.0], [44.2, 1337.0], [44.3, 1337.0], [44.4, 1337.0], [44.5, 1346.0], [44.6, 1346.0], [44.7, 1346.0], [44.8, 1346.0], [44.9, 1346.0], [45.0, 1352.0], [45.1, 1352.0], [45.2, 1352.0], [45.3, 1352.0], [45.4, 1352.0], [45.5, 1360.0], [45.6, 1360.0], [45.7, 1360.0], [45.8, 1360.0], [45.9, 1360.0], [46.0, 1368.0], [46.1, 1368.0], [46.2, 1368.0], [46.3, 1368.0], [46.4, 1368.0], [46.5, 1377.0], [46.6, 1377.0], [46.7, 1377.0], [46.8, 1377.0], [46.9, 1377.0], [47.0, 1386.0], [47.1, 1386.0], [47.2, 1386.0], [47.3, 1386.0], [47.4, 1386.0], [47.5, 1393.0], [47.6, 1393.0], [47.7, 1393.0], [47.8, 1393.0], [47.9, 1393.0], [48.0, 1399.0], [48.1, 1399.0], [48.2, 1399.0], [48.3, 1399.0], [48.4, 1399.0], [48.5, 1406.0], [48.6, 1406.0], [48.7, 1406.0], [48.8, 1406.0], [48.9, 1406.0], [49.0, 1408.0], [49.1, 1408.0], [49.2, 1408.0], [49.3, 1408.0], [49.4, 1408.0], [49.5, 1410.0], [49.6, 1410.0], [49.7, 1410.0], [49.8, 1410.0], [49.9, 1410.0], [50.0, 1413.0], [50.1, 1413.0], [50.2, 1413.0], [50.3, 1413.0], [50.4, 1413.0], [50.5, 1414.0], [50.6, 1414.0], [50.7, 1414.0], [50.8, 1414.0], [50.9, 1414.0], [51.0, 1535.0], [51.1, 1535.0], [51.2, 1535.0], [51.3, 1535.0], [51.4, 1535.0], [51.5, 1536.0], [51.6, 1536.0], [51.7, 1536.0], [51.8, 1536.0], [51.9, 1536.0], [52.0, 1563.0], [52.1, 1563.0], [52.2, 1563.0], [52.3, 1563.0], [52.4, 1563.0], [52.5, 1581.0], [52.6, 1581.0], [52.7, 1581.0], [52.8, 1581.0], [52.9, 1581.0], [53.0, 1589.0], [53.1, 1589.0], [53.2, 1589.0], [53.3, 1589.0], [53.4, 1589.0], [53.5, 1592.0], [53.6, 1592.0], [53.7, 1592.0], [53.8, 1592.0], [53.9, 1592.0], [54.0, 1596.0], [54.1, 1596.0], [54.2, 1596.0], [54.3, 1596.0], [54.4, 1596.0], [54.5, 1600.0], [54.6, 1600.0], [54.7, 1600.0], [54.8, 1600.0], [54.9, 1600.0], [55.0, 1609.0], [55.1, 1609.0], [55.2, 1609.0], [55.3, 1609.0], [55.4, 1609.0], [55.5, 1618.0], [55.6, 1618.0], [55.7, 1618.0], [55.8, 1618.0], [55.9, 1618.0], [56.0, 1630.0], [56.1, 1630.0], [56.2, 1630.0], [56.3, 1630.0], [56.4, 1630.0], [56.5, 1637.0], [56.6, 1637.0], [56.7, 1637.0], [56.8, 1637.0], [56.9, 1637.0], [57.0, 1645.0], [57.1, 1645.0], [57.2, 1645.0], [57.3, 1645.0], [57.4, 1645.0], [57.5, 1650.0], [57.6, 1650.0], [57.7, 1650.0], [57.8, 1650.0], [57.9, 1650.0], [58.0, 1654.0], [58.1, 1654.0], [58.2, 1654.0], [58.3, 1654.0], [58.4, 1654.0], [58.5, 1662.0], [58.6, 1662.0], [58.7, 1662.0], [58.8, 1662.0], [58.9, 1662.0], [59.0, 1667.0], [59.1, 1667.0], [59.2, 1667.0], [59.3, 1667.0], [59.4, 1667.0], [59.5, 1674.0], [59.6, 1674.0], [59.7, 1674.0], [59.8, 1674.0], [59.9, 1674.0], [60.0, 1680.0], [60.1, 1680.0], [60.2, 1680.0], [60.3, 1680.0], [60.4, 1680.0], [60.5, 1683.0], [60.6, 1683.0], [60.7, 1683.0], [60.8, 1683.0], [60.9, 1683.0], [61.0, 1691.0], [61.1, 1691.0], [61.2, 1691.0], [61.3, 1691.0], [61.4, 1691.0], [61.5, 1694.0], [61.6, 1694.0], [61.7, 1694.0], [61.8, 1694.0], [61.9, 1694.0], [62.0, 1699.0], [62.1, 1699.0], [62.2, 1699.0], [62.3, 1699.0], [62.4, 1699.0], [62.5, 1706.0], [62.6, 1706.0], [62.7, 1706.0], [62.8, 1706.0], [62.9, 1706.0], [63.0, 1713.0], [63.1, 1713.0], [63.2, 1713.0], [63.3, 1713.0], [63.4, 1713.0], [63.5, 1723.0], [63.6, 1723.0], [63.7, 1723.0], [63.8, 1723.0], [63.9, 1723.0], [64.0, 1734.0], [64.1, 1734.0], [64.2, 1734.0], [64.3, 1734.0], [64.4, 1734.0], [64.5, 1744.0], [64.6, 1744.0], [64.7, 1744.0], [64.8, 1744.0], [64.9, 1744.0], [65.0, 1751.0], [65.1, 1751.0], [65.2, 1751.0], [65.3, 1751.0], [65.4, 1751.0], [65.5, 1758.0], [65.6, 1758.0], [65.7, 1758.0], [65.8, 1758.0], [65.9, 1758.0], [66.0, 1766.0], [66.1, 1766.0], [66.2, 1766.0], [66.3, 1766.0], [66.4, 1766.0], [66.5, 1771.0], [66.6, 1771.0], [66.7, 1771.0], [66.8, 1771.0], [66.9, 1771.0], [67.0, 1777.0], [67.1, 1777.0], [67.2, 1777.0], [67.3, 1777.0], [67.4, 1777.0], [67.5, 1927.0], [67.6, 1927.0], [67.7, 1927.0], [67.8, 1927.0], [67.9, 1927.0], [68.0, 1957.0], [68.1, 1957.0], [68.2, 1957.0], [68.3, 1957.0], [68.4, 1957.0], [68.5, 1964.0], [68.6, 1964.0], [68.7, 1964.0], [68.8, 1964.0], [68.9, 1964.0], [69.0, 1968.0], [69.1, 1968.0], [69.2, 1968.0], [69.3, 1968.0], [69.4, 1968.0], [69.5, 1973.0], [69.6, 1973.0], [69.7, 1973.0], [69.8, 1973.0], [69.9, 1973.0], [70.0, 1978.0], [70.1, 1978.0], [70.2, 1978.0], [70.3, 1978.0], [70.4, 1978.0], [70.5, 1984.0], [70.6, 1984.0], [70.7, 1984.0], [70.8, 1984.0], [70.9, 1984.0], [71.0, 1986.0], [71.1, 1986.0], [71.2, 1986.0], [71.3, 1986.0], [71.4, 1986.0], [71.5, 1991.0], [71.6, 1991.0], [71.7, 1991.0], [71.8, 1991.0], [71.9, 1991.0], [72.0, 1994.0], [72.1, 1994.0], [72.2, 1994.0], [72.3, 1994.0], [72.4, 1994.0], [72.5, 1999.0], [72.6, 1999.0], [72.7, 1999.0], [72.8, 1999.0], [72.9, 1999.0], [73.0, 2001.0], [73.1, 2001.0], [73.2, 2001.0], [73.3, 2001.0], [73.4, 2001.0], [73.5, 2007.0], [73.6, 2007.0], [73.7, 2007.0], [73.8, 2007.0], [73.9, 2007.0], [74.0, 2010.0], [74.1, 2010.0], [74.2, 2010.0], [74.3, 2010.0], [74.4, 2010.0], [74.5, 2014.0], [74.6, 2014.0], [74.7, 2014.0], [74.8, 2014.0], [74.9, 2014.0], [75.0, 2020.0], [75.1, 2020.0], [75.2, 2020.0], [75.3, 2020.0], [75.4, 2020.0], [75.5, 2025.0], [75.6, 2025.0], [75.7, 2025.0], [75.8, 2025.0], [75.9, 2025.0], [76.0, 2030.0], [76.1, 2030.0], [76.2, 2030.0], [76.3, 2030.0], [76.4, 2030.0], [76.5, 2033.0], [76.6, 2033.0], [76.7, 2033.0], [76.8, 2033.0], [76.9, 2033.0], [77.0, 2038.0], [77.1, 2038.0], [77.2, 2038.0], [77.3, 2038.0], [77.4, 2038.0], [77.5, 2047.0], [77.6, 2047.0], [77.7, 2047.0], [77.8, 2047.0], [77.9, 2047.0], [78.0, 2053.0], [78.1, 2053.0], [78.2, 2053.0], [78.3, 2053.0], [78.4, 2053.0], [78.5, 2059.0], [78.6, 2059.0], [78.7, 2059.0], [78.8, 2059.0], [78.9, 2059.0], [79.0, 2065.0], [79.1, 2065.0], [79.2, 2065.0], [79.3, 2065.0], [79.4, 2065.0], [79.5, 2070.0], [79.6, 2070.0], [79.7, 2070.0], [79.8, 2070.0], [79.9, 2070.0], [80.0, 2077.0], [80.1, 2077.0], [80.2, 2077.0], [80.3, 2077.0], [80.4, 2077.0], [80.5, 2081.0], [80.6, 2081.0], [80.7, 2081.0], [80.8, 2081.0], [80.9, 2081.0], [81.0, 2086.0], [81.1, 2086.0], [81.2, 2086.0], [81.3, 2086.0], [81.4, 2086.0], [81.5, 2091.0], [81.6, 2091.0], [81.7, 2091.0], [81.8, 2091.0], [81.9, 2091.0], [82.0, 2094.0], [82.1, 2094.0], [82.2, 2094.0], [82.3, 2094.0], [82.4, 2094.0], [82.5, 2100.0], [82.6, 2100.0], [82.7, 2100.0], [82.8, 2100.0], [82.9, 2100.0], [83.0, 2109.0], [83.1, 2109.0], [83.2, 2109.0], [83.3, 2109.0], [83.4, 2109.0], [83.5, 2273.0], [83.6, 2273.0], [83.7, 2273.0], [83.8, 2273.0], [83.9, 2273.0], [84.0, 2279.0], [84.1, 2279.0], [84.2, 2279.0], [84.3, 2279.0], [84.4, 2279.0], [84.5, 2285.0], [84.6, 2285.0], [84.7, 2285.0], [84.8, 2285.0], [84.9, 2285.0], [85.0, 2293.0], [85.1, 2293.0], [85.2, 2293.0], [85.3, 2293.0], [85.4, 2293.0], [85.5, 2298.0], [85.6, 2298.0], [85.7, 2298.0], [85.8, 2298.0], [85.9, 2298.0], [86.0, 2307.0], [86.1, 2307.0], [86.2, 2307.0], [86.3, 2307.0], [86.4, 2307.0], [86.5, 2311.0], [86.6, 2311.0], [86.7, 2311.0], [86.8, 2311.0], [86.9, 2311.0], [87.0, 2316.0], [87.1, 2316.0], [87.2, 2316.0], [87.3, 2316.0], [87.4, 2316.0], [87.5, 2319.0], [87.6, 2319.0], [87.7, 2319.0], [87.8, 2319.0], [87.9, 2319.0], [88.0, 2325.0], [88.1, 2325.0], [88.2, 2325.0], [88.3, 2325.0], [88.4, 2325.0], [88.5, 2329.0], [88.6, 2329.0], [88.7, 2329.0], [88.8, 2329.0], [88.9, 2329.0], [89.0, 2334.0], [89.1, 2334.0], [89.2, 2334.0], [89.3, 2334.0], [89.4, 2334.0], [89.5, 2338.0], [89.6, 2338.0], [89.7, 2338.0], [89.8, 2338.0], [89.9, 2338.0], [90.0, 2343.0], [90.1, 2343.0], [90.2, 2343.0], [90.3, 2343.0], [90.4, 2343.0], [90.5, 2346.0], [90.6, 2346.0], [90.7, 2346.0], [90.8, 2346.0], [90.9, 2346.0], [91.0, 2351.0], [91.1, 2351.0], [91.2, 2351.0], [91.3, 2351.0], [91.4, 2351.0], [91.5, 2358.0], [91.6, 2358.0], [91.7, 2358.0], [91.8, 2358.0], [91.9, 2358.0], [92.0, 2367.0], [92.1, 2367.0], [92.2, 2367.0], [92.3, 2367.0], [92.4, 2367.0], [92.5, 2371.0], [92.6, 2371.0], [92.7, 2371.0], [92.8, 2371.0], [92.9, 2371.0], [93.0, 2375.0], [93.1, 2375.0], [93.2, 2375.0], [93.3, 2375.0], [93.4, 2375.0], [93.5, 2378.0], [93.6, 2378.0], [93.7, 2378.0], [93.8, 2378.0], [93.9, 2378.0], [94.0, 2382.0], [94.1, 2382.0], [94.2, 2382.0], [94.3, 2382.0], [94.4, 2382.0], [94.5, 2386.0], [94.6, 2386.0], [94.7, 2386.0], [94.8, 2386.0], [94.9, 2386.0], [95.0, 2392.0], [95.1, 2392.0], [95.2, 2392.0], [95.3, 2392.0], [95.4, 2392.0], [95.5, 2395.0], [95.6, 2395.0], [95.7, 2395.0], [95.8, 2395.0], [95.9, 2395.0], [96.0, 2404.0], [96.1, 2404.0], [96.2, 2404.0], [96.3, 2404.0], [96.4, 2404.0], [96.5, 2412.0], [96.6, 2412.0], [96.7, 2412.0], [96.8, 2412.0], [96.9, 2412.0], [97.0, 2415.0], [97.1, 2415.0], [97.2, 2415.0], [97.3, 2415.0], [97.4, 2415.0], [97.5, 2422.0], [97.6, 2422.0], [97.7, 2422.0], [97.8, 2422.0], [97.9, 2422.0], [98.0, 2427.0], [98.1, 2427.0], [98.2, 2427.0], [98.3, 2427.0], [98.4, 2427.0], [98.5, 2429.0], [98.6, 2429.0], [98.7, 2429.0], [98.8, 2429.0], [98.9, 2429.0], [99.0, 2436.0], [99.1, 2436.0], [99.2, 2436.0], [99.3, 2436.0], [99.4, 2436.0], [99.5, 2469.0], [99.6, 2469.0], [99.7, 2469.0], [99.8, 2469.0], [99.9, 2469.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 21.0, "series": [{"data": [[0.0, 1.0], [2100.0, 2.0], [2200.0, 5.0], [2300.0, 20.0], [600.0, 21.0], [2400.0, 8.0], [700.0, 8.0], [200.0, 3.0], [800.0, 1.0], [900.0, 12.0], [1000.0, 17.0], [1100.0, 2.0], [1200.0, 11.0], [1300.0, 15.0], [1400.0, 5.0], [1500.0, 7.0], [400.0, 2.0], [1600.0, 16.0], [1700.0, 10.0], [1900.0, 11.0], [500.0, 4.0], [2000.0, 19.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 2400.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 6.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1.500ms"], [2, "Requests having \nresponse time > 1.500ms"], [3, "Requests in error"]], "maxY": 98.0, "series": [{"data": [[0.0, 6.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 96.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1.500ms", "isController": false}, {"data": [[2.0, 98.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1.500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 98.40499999999992, "minX": 1.71286446E12, "maxY": 98.40499999999992, "series": [{"data": [[1.71286446E12, 98.40499999999992]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71286446E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 439.0, "minX": 1.0, "maxY": 2469.0, "series": [{"data": [[2.0, 2436.0], [3.0, 2429.0], [4.0, 2427.0], [5.0, 2422.0], [6.0, 2415.0], [7.0, 1237.5], [8.0, 2404.0], [9.0, 2395.0], [10.0, 2392.0], [11.0, 2386.0], [12.0, 2382.0], [13.0, 2378.0], [14.0, 2375.0], [15.0, 2371.0], [16.0, 2367.0], [17.0, 2358.0], [18.0, 2351.0], [26.0, 2346.0], [28.0, 2324.6666666666665], [29.0, 2298.0], [30.0, 2293.0], [31.0, 2285.0], [33.0, 2273.0], [32.0, 2279.0], [35.0, 2100.0], [34.0, 2109.0], [37.0, 2091.0], [36.0, 2094.0], [39.0, 2081.0], [38.0, 2086.0], [41.0, 2070.0], [40.0, 2077.0], [43.0, 2059.0], [42.0, 2065.0], [45.0, 2047.0], [44.0, 2053.0], [47.0, 2033.0], [46.0, 2038.0], [49.0, 2025.0], [48.0, 2030.0], [51.0, 2014.0], [50.0, 2020.0], [53.0, 2007.0], [52.0, 2010.0], [55.0, 1999.0], [54.0, 2001.0], [57.0, 1991.0], [56.0, 1994.0], [59.0, 1984.0], [58.0, 1986.0], [61.0, 1973.0], [60.0, 1978.0], [63.0, 1964.0], [62.0, 1968.0], [67.0, 1771.0], [66.0, 1777.0], [65.0, 1927.0], [64.0, 1957.0], [71.0, 1744.0], [70.0, 1751.0], [69.0, 1758.0], [68.0, 1766.0], [75.0, 1706.0], [74.0, 1713.0], [73.0, 1723.0], [72.0, 1734.0], [79.0, 1683.0], [78.0, 1691.0], [77.0, 1694.0], [76.0, 1699.0], [83.0, 1662.0], [82.0, 1667.0], [81.0, 1674.0], [80.0, 1680.0], [87.0, 1637.0], [86.0, 1645.0], [85.0, 1650.0], [84.0, 1654.0], [91.0, 1600.0], [90.0, 1609.0], [89.0, 1618.0], [88.0, 1630.0], [95.0, 1581.0], [94.0, 1589.0], [93.0, 1592.0], [92.0, 1596.0], [99.0, 1414.0], [98.0, 1535.5], [96.0, 1563.0], [103.0, 630.6666666666667], [102.0, 820.5], [101.0, 1413.0], [100.0, 1410.0], [111.0, 1346.0], [110.0, 1352.0], [109.0, 1360.0], [108.0, 1384.6], [115.0, 1321.0], [114.0, 1326.0], [113.0, 1331.0], [112.0, 1337.0], [119.0, 1290.0], [118.0, 1300.0], [117.0, 1306.0], [116.0, 1315.0], [123.0, 1272.0], [122.0, 1277.0], [121.0, 1282.0], [120.0, 1285.0], [127.0, 1256.0], [126.0, 1262.0], [125.0, 1266.0], [124.0, 1270.0], [135.0, 1075.0], [134.0, 1080.0], [133.0, 1084.0], [132.0, 1092.0], [131.0, 1100.0], [130.0, 1107.0], [129.0, 1246.0], [128.0, 1253.0], [143.0, 1027.0], [142.0, 1038.0], [141.0, 1045.0], [140.0, 1049.0], [139.0, 1057.0], [138.0, 1062.0], [137.0, 1068.0], [136.0, 1071.0], [151.0, 989.0], [150.0, 993.0], [149.0, 999.0], [148.0, 1003.0], [147.0, 1008.0], [146.0, 1013.0], [145.0, 1016.0], [144.0, 1019.0], [159.0, 960.0], [158.0, 965.0], [157.0, 970.0], [156.0, 973.0], [155.0, 974.0], [154.0, 978.0], [153.0, 982.0], [152.0, 987.0], [167.0, 706.0], [166.0, 711.0], [165.0, 716.0], [164.0, 719.0], [163.0, 723.0], [162.0, 731.0], [161.0, 839.0], [160.0, 958.0], [175.0, 664.0], [174.0, 672.0], [173.0, 680.0], [172.0, 686.0], [171.0, 690.0], [170.0, 696.0], [169.0, 700.0], [168.0, 704.0], [183.0, 626.0], [182.0, 633.0], [181.0, 639.0], [180.0, 644.0], [179.0, 646.0], [178.0, 649.0], [177.0, 654.0], [176.0, 658.0], [190.0, 634.0], [189.0, 601.0], [188.0, 606.0], [187.0, 612.0], [186.0, 611.0], [185.0, 615.0], [184.0, 624.0], [196.0, 439.0], [195.0, 447.0], [194.0, 547.25], [1.0, 2469.0]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[98.40499999999992, 1472.6949999999997]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 196.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 3646.6666666666665, "minX": 1.71286446E12, "maxY": 4806.666666666667, "series": [{"data": [[1.71286446E12, 4806.666666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.71286446E12, 3646.6666666666665]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71286446E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 1472.6949999999997, "minX": 1.71286446E12, "maxY": 1472.6949999999997, "series": [{"data": [[1.71286446E12, 1472.6949999999997]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71286446E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 1472.6500000000003, "minX": 1.71286446E12, "maxY": 1472.6500000000003, "series": [{"data": [[1.71286446E12, 1472.6500000000003]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71286446E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 1278.4550000000002, "minX": 1.71286446E12, "maxY": 1278.4550000000002, "series": [{"data": [[1.71286446E12, 1278.4550000000002]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71286446E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 63.0, "minX": 1.71286446E12, "maxY": 2469.0, "series": [{"data": [[1.71286446E12, 2469.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.71286446E12, 2342.5]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.71286446E12, 2435.9300000000003]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.71286446E12, 2391.7]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.71286446E12, 63.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.71286446E12, 1411.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71286446E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 626.0, "minX": 33.0, "maxY": 2038.0, "series": [{"data": [[33.0, 626.0], [76.0, 1176.5], [91.0, 2038.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 91.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 626.0, "minX": 33.0, "maxY": 2038.0, "series": [{"data": [[33.0, 626.0], [76.0, 1176.5], [91.0, 2038.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 91.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 3.3333333333333335, "minX": 1.71286446E12, "maxY": 3.3333333333333335, "series": [{"data": [[1.71286446E12, 3.3333333333333335]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71286446E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 3.3333333333333335, "minX": 1.71286446E12, "maxY": 3.3333333333333335, "series": [{"data": [[1.71286446E12, 3.3333333333333335]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71286446E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 3.3333333333333335, "minX": 1.71286446E12, "maxY": 3.3333333333333335, "series": [{"data": [[1.71286446E12, 3.3333333333333335]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71286446E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 3.3333333333333335, "minX": 1.71286446E12, "maxY": 3.3333333333333335, "series": [{"data": [[1.71286446E12, 3.3333333333333335]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71286446E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

