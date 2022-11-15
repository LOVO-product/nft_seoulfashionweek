
#!/bin/bash
 


#FFMPEG로 인코딩

a=0
while [ "$a" -lt 87 ]
do
    ffmpeg -i /Users/sewon/Downloads/isu/$a.mp4  /Users/sewon/Downloads/output/$a.webm
    a=$(expr $a + 1)
    echo $a
done


