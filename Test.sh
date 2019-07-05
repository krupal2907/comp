local="/etc/systemd/system/rc-local.service"

echo "[Unit]" >> local
echo " Description=/etc/rc.local Compatibility" >> local
echo " ConditionPathExists=/etc/rc.local" >> local

echo "[Service]" >> local
echo " Type=forking" >> local
echo " ExecStart=/etc/rc.local start" >> local
echo " TimeoutSec=0" >> local
echo " StandardOutput=tty" >> local
echo " RemainAfterExit=yes" >> local
echo " SysVStartPriority=99" >> local

echo "[Install]" >> local
echo " WantedBy=multi-user.target" >> local

cd /etc
cp rc.local temp.local
sed '$d' temp.local > rc.local
rm -f temp.local

echo "(sleep 30; “python /home/debian/welcome.py”) &" >> rc.local

echo "(sleep 30) &" >> rc.local

cd /home/debian

echo "print ('Welcome to Odinub')" >> welcome.py

