## auth.py
+ /api/login @POST: username, password
success:	{"token": token}
failed:		{"msg": "Invalid username/password"}

+ /api/register @POST: username, password, email
success:	{"objectid": objectid}
failed:		{"msg": "Register failed"...}

## job.py
+ /api/job @PUT: flow[sepcify in Proxy.py]

+ /api/list/job @GET
return:		[job.id, job.status, job.result] in JobPool

+ /api/job/<string:id> @GET
return 		{"_id":id, "data_done": date, "result": result}

+ /api/job/<string:id> @POST action=['forget', 'revoke']
success: 	"Success"
failed:		500: "Failed"
			400: {"msg": "Invalid action"...}

## result.py
+ /api/update/result @GET item_each_page
return          {"item_each_page": item_each_psge}

+ /api/update/result @POST 
suceess:	{"msg": "success"}
failed:		500: {"msg": e}

+ /api/result/<string:id> @GET
return {
    "_id": "57c56bad02353020c954b8ef", 
    "code": 1, 
    "endtime": "2016-08-30 19:18:42", 
    "msg": "success", 
    "poc": "sqli_error", 
    "return": "{'VerifyInfo': {'URL': u'http://jjh.jnu.edu.cn/', 'Payload': {u'C': u\"{u'PHPSESSID': u'25tgqmmv6dkq94uje157ccc4c5'}\", u'F': None, u'M': u'GET', u'O': None, u'R': u'http://xy.jnu.edu.cn/news/note/28.html', u'action': None}}}", 
    "url": "http://jjh.jnu.edu.cn/"
}

+ /api/result/<string:id> @POST mark=['success', 'fail']
success:        {"modified_count": count}
failed:         {"msg": "Invaild mark"...}

+ /api/result/<string:id> @DELETE 
return {"delete_count": delete_count:}

+ /api/list/result/<int:page> @GET key=["url", "poc", "msg", "endtime", "return"]
, regex, code
success: [{
    "_id": "57c56bad02353020c954b8ef", 
    "code": 1, 
    "endtime": "2016-08-30 19:18:42", 
    "msg": "success", 
    "poc": "sqli_error", 
    "return": "{'VerifyInfo': {'URL': u'http://jjh.jnu.edu.cn/', 'Payload': {u'C': u\"{u'PHPSESSID': u'25tgqmmv6dkq94uje157ccc4c5'}\", u'F': None, u'M': u'GET', u'O': None, u'R': u'http://xy.jnu.edu.cn/news/note/28.html', u'action': None}}}", 
    "url": "http://jjh.jnu.edu.cn/"
}]		
failed:	400: {"msg": "Invalid request."}

## script.py
+ /api/list/script @GET
return [
    [
        "sqli_error", 
        true # rule.is_enable
    ], 
    [
        "s2-016", 
        true
    ], 
    [
        "sqli_blind", 
        true
    ], 
    [
        "sqli_time", 
        true
    ]
]

+ /api/download/script/<string:name> @GET
return script_file

+ /api/script/<string:name> @GET
return {
    "content": "...", 
    "invoke_rule": null, 
    "is_enable": true, 
    "name": "s2-016", 
    "rule_type": null
}

+ /api/script/<string:name> @POST action=['toggle', 'set_rule'], invoke_rule
toggle:	return script.toggle_enable()
set_rule:
	success: "Success"
	failed: 500: "Failed"
failed: 400: {"msg": "Invalid action"}

+ /api/script/<string:name> @PUT file
success: {"msg": "name.py uploaded"}
failed:	 500: {"msg": "Upload failed."}

## worker.py
+ /api/list/worker @GET
return {
    "celery@matthew-ThinkPad-X1-Carbon-3rd": [
        "task.s2-016", 
        "task.sqli_blind", 
        "task.sqli_error", 
        "task.sqli_time"
    ]
}

+ /api/worker/<string:name=all...> @GET task=['active', scheduled, reserved]
task=None:
{
    "celery@matthew-ThinkPad-X1-Carbon-3rd": {
        "broker": {
            "alternates": [], 
            "connect_timeout": 4, 
            "heartbeat": null, 
            "hostname": "rabbitmq.t0.daoapp.io", 
            "insist": false, 
            "login_method": "AMQPLAIN", 
            "port": 61539, 
            "ssl": false, 
            "transport": "amqp", 
            "transport_options": {}, 
            "uri_prefix": null, 
            "userid": "guest", 
            "virtual_host": "/"
        }, 
        "clock": "229", 
        "pid": 410, 
        "pool": {
            "max-concurrency": 4, 
            "max-tasks-per-child": "N/A", 
            "processes": [
                415, 
                416, 
                417, 
                418
            ], 
            "put-guarded-by-semaphore": false, 
            "timeouts": [
                0, 
                0
            ], 
            "writes": {
                "all": "25.00%, 25.00%, 25.00%, 25.00%", 
                "avg": "25.00%", 
                "inqueues": {
                    "active": 0, 
                    "total": 4
                }, 
                "raw": "4, 4, 4, 4", 
                "total": 16
            }
        }, 
        "prefetch_count": 16, 
        "rusage": {
            "idrss": 0, 
            "inblock": 0, 
            "isrss": 0, 
            "ixrss": 0, 
            "majflt": 3, 
            "maxrss": 32468, 
            "minflt": 18540, 
            "msgrcv": 0, 
            "msgsnd": 0, 
            "nivcsw": 87, 
            "nsignals": 0, 
            "nswap": 0, 
            "nvcsw": 424, 
            "oublock": 0, 
            "stime": 0.09999999999999999, 
            "utime": 0.38799999999999996
        }, 
        "total": {
            "task.s2-016": 4, 
            "task.sqli_blind": 4, 
            "task.sqli_error": 4, 
            "task.sqli_time": 4
        }
    }
}

task=active...:
{
    "celery@matthew-ThinkPad-X1-Carbon-3rd": []
}


+ /api/worker @POST dest=[...] action=['purge', 'cancel_consumer', 'pool_restart', 'shutdown']

purge:	success:	{"msg": "{} tasks have been discarded"}
cancel_consumer:	reply
pool_restart:		reply
shutdown:			{"msg": "Shutdown messages have sent to {}"}

failed: 400: {"msg": "Invalid action."}