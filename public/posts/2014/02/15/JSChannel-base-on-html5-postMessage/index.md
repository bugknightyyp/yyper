#����html5 postMessageʵ�ֿ���Ŀ⣺JSChannel

##Channel�ṩ�ľ�̬�ӿ�:

``build``: ʹ�� Channel.build({options})������ͨ������;

- `options.window`:��֮ͨ�ŵ�window����
- `options.origin`:
- `options.scope`:
- `options.debugOutput`:
- `options.postMessageObserver`:
- `options.gotMessageObserver`:
- `options.onReady`:

##Channel�����ṩ�ľ�̬�ӿ�:

1 ``unbind``: channelInstance.unbind(method),
2 ``bind``: channelInstance.unbind(method),
3 ``call``: channelInstance.unbind(method),
4 ``notify``: channelInstance.unbind(method),
5 ``destroy``: channelInstance.unbind(method),

##����

�����󣬶Է���������󣬴����߼����߼������꣬�ٸ����Ҵ�������

##Transactions
�����첽�Ĵ�����Ҫ����Transactionsʵ������ɣ���Ҫ�Ѹ�ʵ���ı���첽״̬�����첽������󼤻�����ɷ����������ش�����

```
chan.bind("twiddleThumbs", function(trans, params) {
  setTimeout(function() { 
    trans.complete("thumbs twiddled!"); 
    /*�ֶ�����complete���������߶Է���������
    (chen.call��������success������ִ�У�����complete�����Ĳ�������success����)
    */
  }, 50);
  trans.delayReturn(true);//�ֶ���trans���ó��첽״̬
});
```
