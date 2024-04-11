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
        data: {"result": {"minY": 6967.0, "minX": 0.0, "maxY": 15699.0, "series": [{"data": [[0.0, 6967.0], [0.1, 6967.0], [0.2, 6967.0], [0.3, 6967.0], [0.4, 6967.0], [0.5, 13084.0], [0.6, 13084.0], [0.7, 13084.0], [0.8, 13084.0], [0.9, 13084.0], [1.0, 13781.0], [1.1, 13781.0], [1.2, 13781.0], [1.3, 13781.0], [1.4, 13781.0], [1.5, 13785.0], [1.6, 13785.0], [1.7, 13785.0], [1.8, 13785.0], [1.9, 13785.0], [2.0, 13789.0], [2.1, 13789.0], [2.2, 13789.0], [2.3, 13789.0], [2.4, 13789.0], [2.5, 13803.0], [2.6, 13803.0], [2.7, 13803.0], [2.8, 13803.0], [2.9, 13803.0], [3.0, 13805.0], [3.1, 13805.0], [3.2, 13805.0], [3.3, 13805.0], [3.4, 13805.0], [3.5, 14079.0], [3.6, 14079.0], [3.7, 14079.0], [3.8, 14079.0], [3.9, 14079.0], [4.0, 14515.0], [4.1, 14515.0], [4.2, 14515.0], [4.3, 14515.0], [4.4, 14515.0], [4.5, 14593.0], [4.6, 14593.0], [4.7, 14593.0], [4.8, 14593.0], [4.9, 14593.0], [5.0, 14699.0], [5.1, 14699.0], [5.2, 14699.0], [5.3, 14699.0], [5.4, 14699.0], [5.5, 14709.0], [5.6, 14709.0], [5.7, 14709.0], [5.8, 14709.0], [5.9, 14709.0], [6.0, 14719.0], [6.1, 14719.0], [6.2, 14719.0], [6.3, 14719.0], [6.4, 14719.0], [6.5, 14729.0], [6.6, 14729.0], [6.7, 14729.0], [6.8, 14729.0], [6.9, 14729.0], [7.0, 14736.0], [7.1, 14736.0], [7.2, 14736.0], [7.3, 14736.0], [7.4, 14736.0], [7.5, 14740.0], [7.6, 14740.0], [7.7, 14740.0], [7.8, 14740.0], [7.9, 14740.0], [8.0, 14747.0], [8.1, 14747.0], [8.2, 14747.0], [8.3, 14747.0], [8.4, 14747.0], [8.5, 14760.0], [8.6, 14760.0], [8.7, 14760.0], [8.8, 14760.0], [8.9, 14760.0], [9.0, 14762.0], [9.1, 14762.0], [9.2, 14762.0], [9.3, 14762.0], [9.4, 14762.0], [9.5, 14766.0], [9.6, 14766.0], [9.7, 14766.0], [9.8, 14766.0], [9.9, 14766.0], [10.0, 14767.0], [10.1, 14767.0], [10.2, 14767.0], [10.3, 14767.0], [10.4, 14767.0], [10.5, 14770.0], [10.6, 14770.0], [10.7, 14770.0], [10.8, 14770.0], [10.9, 14770.0], [11.0, 14791.0], [11.1, 14791.0], [11.2, 14791.0], [11.3, 14791.0], [11.4, 14791.0], [11.5, 14796.0], [11.6, 14796.0], [11.7, 14796.0], [11.8, 14796.0], [11.9, 14796.0], [12.0, 14803.0], [12.1, 14803.0], [12.2, 14803.0], [12.3, 14803.0], [12.4, 14803.0], [12.5, 14812.0], [12.6, 14812.0], [12.7, 14812.0], [12.8, 14812.0], [12.9, 14812.0], [13.0, 14844.0], [13.1, 14844.0], [13.2, 14844.0], [13.3, 14844.0], [13.4, 14844.0], [13.5, 14855.0], [13.6, 14855.0], [13.7, 14855.0], [13.8, 14855.0], [13.9, 14855.0], [14.0, 14875.0], [14.1, 14875.0], [14.2, 14875.0], [14.3, 14875.0], [14.4, 14875.0], [14.5, 14880.0], [14.6, 14880.0], [14.7, 14880.0], [14.8, 14880.0], [14.9, 14880.0], [15.0, 14882.0], [15.1, 14882.0], [15.2, 14882.0], [15.3, 14882.0], [15.4, 14882.0], [15.5, 14882.0], [15.6, 14882.0], [15.7, 14882.0], [15.8, 14882.0], [15.9, 14882.0], [16.0, 14884.0], [16.1, 14884.0], [16.2, 14884.0], [16.3, 14884.0], [16.4, 14884.0], [16.5, 14886.0], [16.6, 14886.0], [16.7, 14886.0], [16.8, 14886.0], [16.9, 14886.0], [17.0, 14891.0], [17.1, 14891.0], [17.2, 14891.0], [17.3, 14891.0], [17.4, 14891.0], [17.5, 14902.0], [17.6, 14902.0], [17.7, 14902.0], [17.8, 14902.0], [17.9, 14902.0], [18.0, 14943.0], [18.1, 14943.0], [18.2, 14943.0], [18.3, 14943.0], [18.4, 14943.0], [18.5, 14949.0], [18.6, 14949.0], [18.7, 14949.0], [18.8, 14949.0], [18.9, 14949.0], [19.0, 14972.0], [19.1, 14972.0], [19.2, 14972.0], [19.3, 14972.0], [19.4, 14972.0], [19.5, 14982.0], [19.6, 14982.0], [19.7, 14982.0], [19.8, 14982.0], [19.9, 14982.0], [20.0, 14986.0], [20.1, 14986.0], [20.2, 14986.0], [20.3, 14986.0], [20.4, 14986.0], [20.5, 14992.0], [20.6, 14992.0], [20.7, 14992.0], [20.8, 14992.0], [20.9, 14992.0], [21.0, 14998.0], [21.1, 14998.0], [21.2, 14998.0], [21.3, 14998.0], [21.4, 14998.0], [21.5, 14999.0], [21.6, 14999.0], [21.7, 14999.0], [21.8, 14999.0], [21.9, 14999.0], [22.0, 14999.0], [22.1, 14999.0], [22.2, 14999.0], [22.3, 14999.0], [22.4, 14999.0], [22.5, 15020.0], [22.6, 15020.0], [22.7, 15020.0], [22.8, 15020.0], [22.9, 15020.0], [23.0, 15020.0], [23.1, 15020.0], [23.2, 15020.0], [23.3, 15020.0], [23.4, 15020.0], [23.5, 15022.0], [23.6, 15022.0], [23.7, 15022.0], [23.8, 15022.0], [23.9, 15022.0], [24.0, 15028.0], [24.1, 15028.0], [24.2, 15028.0], [24.3, 15028.0], [24.4, 15028.0], [24.5, 15040.0], [24.6, 15040.0], [24.7, 15040.0], [24.8, 15040.0], [24.9, 15040.0], [25.0, 15050.0], [25.1, 15050.0], [25.2, 15050.0], [25.3, 15050.0], [25.4, 15050.0], [25.5, 15050.0], [25.6, 15050.0], [25.7, 15050.0], [25.8, 15050.0], [25.9, 15050.0], [26.0, 15062.0], [26.1, 15062.0], [26.2, 15062.0], [26.3, 15062.0], [26.4, 15062.0], [26.5, 15067.0], [26.6, 15067.0], [26.7, 15067.0], [26.8, 15067.0], [26.9, 15067.0], [27.0, 15077.0], [27.1, 15077.0], [27.2, 15077.0], [27.3, 15077.0], [27.4, 15077.0], [27.5, 15080.0], [27.6, 15080.0], [27.7, 15080.0], [27.8, 15080.0], [27.9, 15080.0], [28.0, 15080.0], [28.1, 15080.0], [28.2, 15080.0], [28.3, 15080.0], [28.4, 15080.0], [28.5, 15085.0], [28.6, 15085.0], [28.7, 15085.0], [28.8, 15085.0], [28.9, 15085.0], [29.0, 15090.0], [29.1, 15090.0], [29.2, 15090.0], [29.3, 15090.0], [29.4, 15090.0], [29.5, 15096.0], [29.6, 15096.0], [29.7, 15096.0], [29.8, 15096.0], [29.9, 15096.0], [30.0, 15098.0], [30.1, 15098.0], [30.2, 15098.0], [30.3, 15098.0], [30.4, 15098.0], [30.5, 15103.0], [30.6, 15103.0], [30.7, 15103.0], [30.8, 15103.0], [30.9, 15103.0], [31.0, 15104.0], [31.1, 15104.0], [31.2, 15104.0], [31.3, 15104.0], [31.4, 15104.0], [31.5, 15115.0], [31.6, 15115.0], [31.7, 15115.0], [31.8, 15115.0], [31.9, 15115.0], [32.0, 15123.0], [32.1, 15123.0], [32.2, 15123.0], [32.3, 15123.0], [32.4, 15123.0], [32.5, 15132.0], [32.6, 15132.0], [32.7, 15132.0], [32.8, 15132.0], [32.9, 15132.0], [33.0, 15134.0], [33.1, 15134.0], [33.2, 15134.0], [33.3, 15134.0], [33.4, 15134.0], [33.5, 15142.0], [33.6, 15142.0], [33.7, 15142.0], [33.8, 15142.0], [33.9, 15142.0], [34.0, 15147.0], [34.1, 15147.0], [34.2, 15147.0], [34.3, 15147.0], [34.4, 15147.0], [34.5, 15149.0], [34.6, 15149.0], [34.7, 15149.0], [34.8, 15149.0], [34.9, 15149.0], [35.0, 15152.0], [35.1, 15152.0], [35.2, 15152.0], [35.3, 15152.0], [35.4, 15152.0], [35.5, 15155.0], [35.6, 15155.0], [35.7, 15155.0], [35.8, 15155.0], [35.9, 15155.0], [36.0, 15157.0], [36.1, 15157.0], [36.2, 15157.0], [36.3, 15157.0], [36.4, 15157.0], [36.5, 15157.0], [36.6, 15157.0], [36.7, 15157.0], [36.8, 15157.0], [36.9, 15157.0], [37.0, 15163.0], [37.1, 15163.0], [37.2, 15163.0], [37.3, 15163.0], [37.4, 15163.0], [37.5, 15164.0], [37.6, 15164.0], [37.7, 15164.0], [37.8, 15164.0], [37.9, 15164.0], [38.0, 15164.0], [38.1, 15164.0], [38.2, 15164.0], [38.3, 15164.0], [38.4, 15164.0], [38.5, 15165.0], [38.6, 15165.0], [38.7, 15165.0], [38.8, 15165.0], [38.9, 15165.0], [39.0, 15169.0], [39.1, 15169.0], [39.2, 15169.0], [39.3, 15169.0], [39.4, 15169.0], [39.5, 15172.0], [39.6, 15172.0], [39.7, 15172.0], [39.8, 15172.0], [39.9, 15172.0], [40.0, 15173.0], [40.1, 15173.0], [40.2, 15173.0], [40.3, 15173.0], [40.4, 15173.0], [40.5, 15173.0], [40.6, 15173.0], [40.7, 15173.0], [40.8, 15173.0], [40.9, 15173.0], [41.0, 15176.0], [41.1, 15176.0], [41.2, 15176.0], [41.3, 15176.0], [41.4, 15176.0], [41.5, 15176.0], [41.6, 15176.0], [41.7, 15176.0], [41.8, 15176.0], [41.9, 15176.0], [42.0, 15176.0], [42.1, 15176.0], [42.2, 15176.0], [42.3, 15176.0], [42.4, 15176.0], [42.5, 15179.0], [42.6, 15179.0], [42.7, 15179.0], [42.8, 15179.0], [42.9, 15179.0], [43.0, 15186.0], [43.1, 15186.0], [43.2, 15186.0], [43.3, 15186.0], [43.4, 15186.0], [43.5, 15186.0], [43.6, 15186.0], [43.7, 15186.0], [43.8, 15186.0], [43.9, 15186.0], [44.0, 15188.0], [44.1, 15188.0], [44.2, 15188.0], [44.3, 15188.0], [44.4, 15188.0], [44.5, 15189.0], [44.6, 15189.0], [44.7, 15189.0], [44.8, 15189.0], [44.9, 15189.0], [45.0, 15189.0], [45.1, 15189.0], [45.2, 15189.0], [45.3, 15189.0], [45.4, 15189.0], [45.5, 15191.0], [45.6, 15191.0], [45.7, 15191.0], [45.8, 15191.0], [45.9, 15191.0], [46.0, 15192.0], [46.1, 15192.0], [46.2, 15192.0], [46.3, 15192.0], [46.4, 15192.0], [46.5, 15194.0], [46.6, 15194.0], [46.7, 15194.0], [46.8, 15194.0], [46.9, 15194.0], [47.0, 15195.0], [47.1, 15195.0], [47.2, 15195.0], [47.3, 15195.0], [47.4, 15195.0], [47.5, 15196.0], [47.6, 15196.0], [47.7, 15196.0], [47.8, 15196.0], [47.9, 15196.0], [48.0, 15198.0], [48.1, 15198.0], [48.2, 15198.0], [48.3, 15198.0], [48.4, 15198.0], [48.5, 15198.0], [48.6, 15198.0], [48.7, 15198.0], [48.8, 15198.0], [48.9, 15198.0], [49.0, 15200.0], [49.1, 15200.0], [49.2, 15200.0], [49.3, 15200.0], [49.4, 15200.0], [49.5, 15202.0], [49.6, 15202.0], [49.7, 15202.0], [49.8, 15202.0], [49.9, 15202.0], [50.0, 15205.0], [50.1, 15205.0], [50.2, 15205.0], [50.3, 15205.0], [50.4, 15205.0], [50.5, 15206.0], [50.6, 15206.0], [50.7, 15206.0], [50.8, 15206.0], [50.9, 15206.0], [51.0, 15209.0], [51.1, 15209.0], [51.2, 15209.0], [51.3, 15209.0], [51.4, 15209.0], [51.5, 15211.0], [51.6, 15211.0], [51.7, 15211.0], [51.8, 15211.0], [51.9, 15211.0], [52.0, 15212.0], [52.1, 15212.0], [52.2, 15212.0], [52.3, 15212.0], [52.4, 15212.0], [52.5, 15215.0], [52.6, 15215.0], [52.7, 15215.0], [52.8, 15215.0], [52.9, 15215.0], [53.0, 15219.0], [53.1, 15219.0], [53.2, 15219.0], [53.3, 15219.0], [53.4, 15219.0], [53.5, 15220.0], [53.6, 15220.0], [53.7, 15220.0], [53.8, 15220.0], [53.9, 15220.0], [54.0, 15220.0], [54.1, 15220.0], [54.2, 15220.0], [54.3, 15220.0], [54.4, 15220.0], [54.5, 15225.0], [54.6, 15225.0], [54.7, 15225.0], [54.8, 15225.0], [54.9, 15225.0], [55.0, 15226.0], [55.1, 15226.0], [55.2, 15226.0], [55.3, 15226.0], [55.4, 15226.0], [55.5, 15227.0], [55.6, 15227.0], [55.7, 15227.0], [55.8, 15227.0], [55.9, 15227.0], [56.0, 15227.0], [56.1, 15227.0], [56.2, 15227.0], [56.3, 15227.0], [56.4, 15227.0], [56.5, 15236.0], [56.6, 15236.0], [56.7, 15236.0], [56.8, 15236.0], [56.9, 15236.0], [57.0, 15241.0], [57.1, 15241.0], [57.2, 15241.0], [57.3, 15241.0], [57.4, 15241.0], [57.5, 15245.0], [57.6, 15245.0], [57.7, 15245.0], [57.8, 15245.0], [57.9, 15245.0], [58.0, 15248.0], [58.1, 15248.0], [58.2, 15248.0], [58.3, 15248.0], [58.4, 15248.0], [58.5, 15251.0], [58.6, 15251.0], [58.7, 15251.0], [58.8, 15251.0], [58.9, 15251.0], [59.0, 15255.0], [59.1, 15255.0], [59.2, 15255.0], [59.3, 15255.0], [59.4, 15255.0], [59.5, 15257.0], [59.6, 15257.0], [59.7, 15257.0], [59.8, 15257.0], [59.9, 15257.0], [60.0, 15258.0], [60.1, 15258.0], [60.2, 15258.0], [60.3, 15258.0], [60.4, 15258.0], [60.5, 15259.0], [60.6, 15259.0], [60.7, 15259.0], [60.8, 15259.0], [60.9, 15259.0], [61.0, 15266.0], [61.1, 15266.0], [61.2, 15266.0], [61.3, 15266.0], [61.4, 15266.0], [61.5, 15274.0], [61.6, 15274.0], [61.7, 15274.0], [61.8, 15274.0], [61.9, 15274.0], [62.0, 15275.0], [62.1, 15275.0], [62.2, 15275.0], [62.3, 15275.0], [62.4, 15275.0], [62.5, 15278.0], [62.6, 15278.0], [62.7, 15278.0], [62.8, 15278.0], [62.9, 15278.0], [63.0, 15279.0], [63.1, 15279.0], [63.2, 15279.0], [63.3, 15279.0], [63.4, 15279.0], [63.5, 15292.0], [63.6, 15292.0], [63.7, 15292.0], [63.8, 15292.0], [63.9, 15292.0], [64.0, 15292.0], [64.1, 15292.0], [64.2, 15292.0], [64.3, 15292.0], [64.4, 15292.0], [64.5, 15293.0], [64.6, 15293.0], [64.7, 15293.0], [64.8, 15293.0], [64.9, 15293.0], [65.0, 15303.0], [65.1, 15303.0], [65.2, 15303.0], [65.3, 15303.0], [65.4, 15303.0], [65.5, 15307.0], [65.6, 15307.0], [65.7, 15307.0], [65.8, 15307.0], [65.9, 15307.0], [66.0, 15310.0], [66.1, 15310.0], [66.2, 15310.0], [66.3, 15310.0], [66.4, 15310.0], [66.5, 15315.0], [66.6, 15315.0], [66.7, 15315.0], [66.8, 15315.0], [66.9, 15315.0], [67.0, 15321.0], [67.1, 15321.0], [67.2, 15321.0], [67.3, 15321.0], [67.4, 15321.0], [67.5, 15323.0], [67.6, 15323.0], [67.7, 15323.0], [67.8, 15323.0], [67.9, 15323.0], [68.0, 15324.0], [68.1, 15324.0], [68.2, 15324.0], [68.3, 15324.0], [68.4, 15324.0], [68.5, 15327.0], [68.6, 15327.0], [68.7, 15327.0], [68.8, 15327.0], [68.9, 15327.0], [69.0, 15336.0], [69.1, 15336.0], [69.2, 15336.0], [69.3, 15336.0], [69.4, 15336.0], [69.5, 15336.0], [69.6, 15336.0], [69.7, 15336.0], [69.8, 15336.0], [69.9, 15336.0], [70.0, 15344.0], [70.1, 15344.0], [70.2, 15344.0], [70.3, 15344.0], [70.4, 15344.0], [70.5, 15347.0], [70.6, 15347.0], [70.7, 15347.0], [70.8, 15347.0], [70.9, 15347.0], [71.0, 15349.0], [71.1, 15349.0], [71.2, 15349.0], [71.3, 15349.0], [71.4, 15349.0], [71.5, 15355.0], [71.6, 15355.0], [71.7, 15355.0], [71.8, 15355.0], [71.9, 15355.0], [72.0, 15373.0], [72.1, 15373.0], [72.2, 15373.0], [72.3, 15373.0], [72.4, 15373.0], [72.5, 15378.0], [72.6, 15378.0], [72.7, 15378.0], [72.8, 15378.0], [72.9, 15378.0], [73.0, 15381.0], [73.1, 15381.0], [73.2, 15381.0], [73.3, 15381.0], [73.4, 15381.0], [73.5, 15382.0], [73.6, 15382.0], [73.7, 15382.0], [73.8, 15382.0], [73.9, 15382.0], [74.0, 15383.0], [74.1, 15383.0], [74.2, 15383.0], [74.3, 15383.0], [74.4, 15383.0], [74.5, 15388.0], [74.6, 15388.0], [74.7, 15388.0], [74.8, 15388.0], [74.9, 15388.0], [75.0, 15389.0], [75.1, 15389.0], [75.2, 15389.0], [75.3, 15389.0], [75.4, 15389.0], [75.5, 15391.0], [75.6, 15391.0], [75.7, 15391.0], [75.8, 15391.0], [75.9, 15391.0], [76.0, 15393.0], [76.1, 15393.0], [76.2, 15393.0], [76.3, 15393.0], [76.4, 15393.0], [76.5, 15393.0], [76.6, 15393.0], [76.7, 15393.0], [76.8, 15393.0], [76.9, 15393.0], [77.0, 15397.0], [77.1, 15397.0], [77.2, 15397.0], [77.3, 15397.0], [77.4, 15397.0], [77.5, 15397.0], [77.6, 15397.0], [77.7, 15397.0], [77.8, 15397.0], [77.9, 15397.0], [78.0, 15398.0], [78.1, 15398.0], [78.2, 15398.0], [78.3, 15398.0], [78.4, 15398.0], [78.5, 15399.0], [78.6, 15399.0], [78.7, 15399.0], [78.8, 15399.0], [78.9, 15399.0], [79.0, 15399.0], [79.1, 15399.0], [79.2, 15399.0], [79.3, 15399.0], [79.4, 15399.0], [79.5, 15400.0], [79.6, 15400.0], [79.7, 15400.0], [79.8, 15400.0], [79.9, 15400.0], [80.0, 15401.0], [80.1, 15401.0], [80.2, 15401.0], [80.3, 15401.0], [80.4, 15401.0], [80.5, 15402.0], [80.6, 15402.0], [80.7, 15402.0], [80.8, 15402.0], [80.9, 15402.0], [81.0, 15406.0], [81.1, 15406.0], [81.2, 15406.0], [81.3, 15406.0], [81.4, 15406.0], [81.5, 15406.0], [81.6, 15406.0], [81.7, 15406.0], [81.8, 15406.0], [81.9, 15406.0], [82.0, 15408.0], [82.1, 15408.0], [82.2, 15408.0], [82.3, 15408.0], [82.4, 15408.0], [82.5, 15409.0], [82.6, 15409.0], [82.7, 15409.0], [82.8, 15409.0], [82.9, 15409.0], [83.0, 15410.0], [83.1, 15410.0], [83.2, 15410.0], [83.3, 15410.0], [83.4, 15410.0], [83.5, 15410.0], [83.6, 15410.0], [83.7, 15410.0], [83.8, 15410.0], [83.9, 15410.0], [84.0, 15411.0], [84.1, 15411.0], [84.2, 15411.0], [84.3, 15411.0], [84.4, 15411.0], [84.5, 15415.0], [84.6, 15415.0], [84.7, 15415.0], [84.8, 15415.0], [84.9, 15415.0], [85.0, 15415.0], [85.1, 15415.0], [85.2, 15415.0], [85.3, 15415.0], [85.4, 15415.0], [85.5, 15416.0], [85.6, 15416.0], [85.7, 15416.0], [85.8, 15416.0], [85.9, 15416.0], [86.0, 15416.0], [86.1, 15416.0], [86.2, 15416.0], [86.3, 15416.0], [86.4, 15416.0], [86.5, 15417.0], [86.6, 15417.0], [86.7, 15417.0], [86.8, 15417.0], [86.9, 15417.0], [87.0, 15419.0], [87.1, 15419.0], [87.2, 15419.0], [87.3, 15419.0], [87.4, 15419.0], [87.5, 15422.0], [87.6, 15422.0], [87.7, 15422.0], [87.8, 15422.0], [87.9, 15422.0], [88.0, 15424.0], [88.1, 15424.0], [88.2, 15424.0], [88.3, 15424.0], [88.4, 15424.0], [88.5, 15426.0], [88.6, 15426.0], [88.7, 15426.0], [88.8, 15426.0], [88.9, 15426.0], [89.0, 15430.0], [89.1, 15430.0], [89.2, 15430.0], [89.3, 15430.0], [89.4, 15430.0], [89.5, 15431.0], [89.6, 15431.0], [89.7, 15431.0], [89.8, 15431.0], [89.9, 15431.0], [90.0, 15443.0], [90.1, 15443.0], [90.2, 15443.0], [90.3, 15443.0], [90.4, 15443.0], [90.5, 15444.0], [90.6, 15444.0], [90.7, 15444.0], [90.8, 15444.0], [90.9, 15444.0], [91.0, 15452.0], [91.1, 15452.0], [91.2, 15452.0], [91.3, 15452.0], [91.4, 15452.0], [91.5, 15457.0], [91.6, 15457.0], [91.7, 15457.0], [91.8, 15457.0], [91.9, 15457.0], [92.0, 15471.0], [92.1, 15471.0], [92.2, 15471.0], [92.3, 15471.0], [92.4, 15471.0], [92.5, 15491.0], [92.6, 15491.0], [92.7, 15491.0], [92.8, 15491.0], [92.9, 15491.0], [93.0, 15492.0], [93.1, 15492.0], [93.2, 15492.0], [93.3, 15492.0], [93.4, 15492.0], [93.5, 15498.0], [93.6, 15498.0], [93.7, 15498.0], [93.8, 15498.0], [93.9, 15498.0], [94.0, 15503.0], [94.1, 15503.0], [94.2, 15503.0], [94.3, 15503.0], [94.4, 15503.0], [94.5, 15533.0], [94.6, 15533.0], [94.7, 15533.0], [94.8, 15533.0], [94.9, 15533.0], [95.0, 15541.0], [95.1, 15541.0], [95.2, 15541.0], [95.3, 15541.0], [95.4, 15541.0], [95.5, 15565.0], [95.6, 15565.0], [95.7, 15565.0], [95.8, 15565.0], [95.9, 15565.0], [96.0, 15566.0], [96.1, 15566.0], [96.2, 15566.0], [96.3, 15566.0], [96.4, 15566.0], [96.5, 15571.0], [96.6, 15571.0], [96.7, 15571.0], [96.8, 15571.0], [96.9, 15571.0], [97.0, 15587.0], [97.1, 15587.0], [97.2, 15587.0], [97.3, 15587.0], [97.4, 15587.0], [97.5, 15602.0], [97.6, 15602.0], [97.7, 15602.0], [97.8, 15602.0], [97.9, 15602.0], [98.0, 15619.0], [98.1, 15619.0], [98.2, 15619.0], [98.3, 15619.0], [98.4, 15619.0], [98.5, 15652.0], [98.6, 15652.0], [98.7, 15652.0], [98.8, 15652.0], [98.9, 15652.0], [99.0, 15665.0], [99.1, 15665.0], [99.2, 15665.0], [99.3, 15665.0], [99.4, 15665.0], [99.5, 15699.0], [99.6, 15699.0], [99.7, 15699.0], [99.8, 15699.0], [99.9, 15699.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 1.0, "minX": 6900.0, "maxY": 37.0, "series": [{"data": [[13000.0, 1.0], [13800.0, 2.0], [13700.0, 3.0], [14000.0, 1.0], [14500.0, 2.0], [14700.0, 13.0], [14600.0, 1.0], [14800.0, 11.0], [14900.0, 10.0], [15000.0, 16.0], [15100.0, 37.0], [15200.0, 32.0], [15300.0, 29.0], [15400.0, 29.0], [15500.0, 7.0], [15600.0, 5.0], [6900.0, 1.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 15600.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 200.0, "minX": 2.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1.500ms"], [2, "Requests having \nresponse time > 1.500ms"], [3, "Requests in error"]], "maxY": 200.0, "series": [{"data": [], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1.500ms", "isController": false}, {"data": [[2.0, 200.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1.500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 106.51000000000012, "minX": 1.7128482E12, "maxY": 106.51000000000012, "series": [{"data": [[1.7128482E12, 106.51000000000012]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7128482E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 6967.0, "minX": 1.0, "maxY": 15619.0, "series": [{"data": [[2.0, 15619.0], [3.0, 15431.0], [5.0, 15408.0], [6.0, 15534.5], [7.0, 15411.0], [10.0, 15419.333333333334], [13.0, 15540.333333333334], [14.0, 15471.0], [17.0, 15392.0], [19.0, 15399.0], [20.0, 15575.5], [23.0, 15451.333333333334], [26.0, 15393.666666666666], [29.0, 15415.0], [32.0, 15549.333333333334], [35.0, 15443.666666666666], [37.0, 15602.0], [39.0, 15402.0], [41.0, 15440.0], [89.0, 15227.0], [88.0, 15294.744680851067], [95.0, 15197.666666666666], [92.0, 15196.0], [98.0, 15228.5], [97.0, 15202.0], [101.0, 15188.0], [100.0, 15183.5], [107.0, 15364.0], [104.0, 15303.333333333334], [110.0, 15198.0], [109.0, 15221.5], [115.0, 15265.0], [113.0, 15344.0], [112.0, 15229.0], [119.0, 15355.0], [118.0, 15237.5], [116.0, 15401.0], [123.0, 15085.0], [121.0, 15089.0], [127.0, 15211.0], [126.0, 15168.5], [124.0, 15122.5], [134.0, 15037.5], [133.0, 14875.0], [131.0, 15079.0], [129.0, 14880.0], [128.0, 15022.0], [141.0, 14999.0], [138.0, 14985.666666666666], [136.0, 14882.0], [149.0, 15152.666666666666], [146.0, 15165.0], [144.0, 14923.0], [159.0, 15028.0], [158.0, 15030.0], [156.0, 15158.333333333334], [155.0, 15147.0], [152.0, 15158.333333333334], [166.0, 15011.666666666666], [163.0, 15084.0], [175.0, 14760.0], [174.0, 14823.0], [173.0, 14992.0], [171.0, 14930.666666666666], [168.0, 14872.0], [183.0, 14762.0], [180.0, 14796.0], [179.0, 14907.25], [191.0, 14593.0], [190.0, 14716.75], [186.0, 14749.5], [184.0, 14812.0], [199.0, 13084.0], [198.0, 13790.333333333334], [196.0, 13789.0], [194.0, 13803.0], [193.0, 14079.0], [192.0, 14515.0], [200.0, 6967.0], [1.0, 15444.0]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[106.51000000000012, 15108.505000000008]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 200.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 940.0, "minX": 1.7128482E12, "maxY": 6506.666666666667, "series": [{"data": [[1.7128482E12, 6506.666666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.7128482E12, 940.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7128482E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 15108.505000000008, "minX": 1.7128482E12, "maxY": 15108.505000000008, "series": [{"data": [[1.7128482E12, 15108.505000000008]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7128482E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 15106.955000000005, "minX": 1.7128482E12, "maxY": 15106.955000000005, "series": [{"data": [[1.7128482E12, 15106.955000000005]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7128482E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 1319.7049999999997, "minX": 1.7128482E12, "maxY": 1319.7049999999997, "series": [{"data": [[1.7128482E12, 1319.7049999999997]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7128482E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 6967.0, "minX": 1.7128482E12, "maxY": 15699.0, "series": [{"data": [[1.7128482E12, 15699.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.7128482E12, 15441.8]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.7128482E12, 15664.87]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.7128482E12, 15540.6]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.7128482E12, 6967.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.7128482E12, 15203.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7128482E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 10025.5, "minX": 1.0, "maxY": 15325.5, "series": [{"data": [[1.0, 10025.5], [66.0, 14989.0], [6.0, 13796.0], [126.0, 15325.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 126.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 10025.5, "minX": 1.0, "maxY": 15325.0, "series": [{"data": [[1.0, 10025.5], [66.0, 14989.0], [6.0, 13790.0], [126.0, 15325.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 126.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 3.3333333333333335, "minX": 1.71284814E12, "maxY": 3.3333333333333335, "series": [{"data": [[1.71284814E12, 3.3333333333333335]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71284814E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 3.3333333333333335, "minX": 1.7128482E12, "maxY": 3.3333333333333335, "series": [{"data": [[1.7128482E12, 3.3333333333333335]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7128482E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 3.3333333333333335, "minX": 1.7128482E12, "maxY": 3.3333333333333335, "series": [{"data": [[1.7128482E12, 3.3333333333333335]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7128482E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 3.3333333333333335, "minX": 1.7128482E12, "maxY": 3.3333333333333335, "series": [{"data": [[1.7128482E12, 3.3333333333333335]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7128482E12, "title": "Total Transactions Per Second"}},
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

