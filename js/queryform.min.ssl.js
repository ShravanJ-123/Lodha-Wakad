function SubmitQueryData(n, t) {
    var c = HiddenValues.vCity,
        l = HiddenValues.vCountry,
        s = HiddenValues.vIP,
        a = n.vURL + "{device=" + HiddenValues.iqGuid + "}",
        v = contains.call(blockedIP, s),
        o, i, r, u, f, e, h;

    if (!v) {
        o = $("#" + t.SenderControlID).val();
        if (checkempty(o)) {
            invalid_data_msg($("#" + t.SenderControlID), "Please enter a valid name to submit your query!");
            $("#" + t.SenderControlID).focus();
            return false;
        }
        invalid_data_msg($("#" + t.SenderControlID), "");

        i = "";
        if (checkempty(t.SenderControlCountryCodeID)) {
            i = HiddenValues.vCountryCode;
        } else {
            i = $("#" + t.SenderControlCountryCodeID).val();
            if (i === undefined) {
                i = HiddenValues.vCountryCode;
            } else if (checkempty(i)) {
                invalid_data_msg($("#" + t.SenderControlCountryCodeID), "Please enter a valid country-code to submit your query!");
                $("#" + t.SenderControlCountryCodeID).focus();
                return false;
            }
            invalid_data_msg($("#" + t.SenderControlCountryCodeID), "");
        }

        r = $("#" + t.SenderControlMobileID).val();
        if (checkempty(r)) {
            invalid_data_msg($("#" + t.SenderControlMobileID), "You have entered an invalid mobile number. Please try again.");
            $("#" + t.SenderControlMobileID).focus();
            return false;
        }
        if (is_numeric(r)) {
            if (HiddenValues.vCountryCode == "+91" && r.length != 10) {
                invalid_data_msg($("#" + t.SenderControlMobileID), "Please enter a valid 10 digit mobile number.");
                $("#" + t.SenderControlMobileID).focus();
                return false;
            }
            invalid_data_msg($("#" + t.SenderControlMobileID), "");
        } else {
            invalid_data_msg($("#" + t.SenderControlMobileID), "You have entered an invalid mobile number. Please try again.");
            $("#" + t.SenderControlMobileID).focus();
            return false;
        }

        u = $("#" + t.SenderControlEmailID).val();
        if (checkempty(u)) {
            invalid_data_msg($("#" + t.SenderControlEmailID), "You have entered an invalid e-mail address. Please try again.");
            $("#" + t.SenderControlEmailID).focus();
            return false;
        }
        if (validate_email(u)) {
            invalid_data_msg($("#" + t.SenderControlEmailID), "");
        } else {
            invalid_data_msg($("#" + t.SenderControlEmailID), "You have entered an invalid e-mail address. Please try again.");
            $("#" + t.SenderControlEmailID).focus();
            return false;
        }

        qMessage = $("#" + t.SenderControlMsgID).val();
        if (checkempty(qMessage)) {
            invalid_data_msg($("#" + t.SenderControlMsgID), "Please provide some information about your query!");
            $("#" + t.SenderControlMsgID).focus();
            return false;
        }
        invalid_data_msg($("#" + t.SenderControlMsgID), "");

        f = $("#" + t.SenderControlTimeID).val();
        if (f === undefined) f = "";

        e = $("#" + t.SenderControlBudgetRangeID).val();
        if (checkempty(e)) e = "Any";

        setProjectQueryData(
            n.vAgentID, o, i, f, r, u, qMessage, l, c, s, a, n.vProject, e
        );

        $("#" + t.SenderControlID).val("");
        $("#" + t.SenderControlMobileID).val("");
        $("#" + t.SenderControlEmailID).val("");
        $("#" + t.SenderControlMsgID).val("");
        $("#" + t.SenderControlTimeID).prop("selectedIndex", 0);

        h = window.open(n.thankspageurl, "popupWindow", "width=359,height=365,top=150,left=500,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no");
        setTimeout(function () {
            h.close();
        }, 3000);
    }
    return true;
}

function setProjectQueryData(n, t, i, r, u, f, e, o, s, h, c, l, a) {
    var v = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    v.onreadystatechange = function () {
        if (v.readyState == 4 && v.status == 200);
    };
    v.open("GET", `https://api2.gtftech.com/AjaxHelper/AgentInstantQuerySetter.aspx?qAgentID=${n}&qSenderName=${t}&qMobileNo=${u}&qEmailID=${f}&qCountryCode=${i}&qTimeslot=${r}&qQueryMessage=${e}&qCountry=${o}&qCityName=${s}&qIP=${h}&micrositeurl=${c}&qProjectName=${l}&qBudgetRange=${a}`, true);
    v.send();
}

function isNumberKey(n) {
    var t = n.which ? n.which : event.keyCode;
    return t > 31 && (t < 48 || t > 57) ? false : true;
}

function emailValidator(n) {
    return n.value.match(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/) ? true : (alert("Invalid E-mail Address! Please re-enter ?"), n.focus(), false);
}

function validate_email(n) {
    return n.match(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/) != null;
}

function is_numeric(n) {
    return /^[0-9-+]+$/.test(n);
}

function checkempty(n) {
    return n == null || n == undefined || n == "undefined" || n == "" || n.length == 0;
}

function getCookie(n) {
    var t, r = n + "=", u = document.cookie.split(";");
    for (var i = 0; i < u.length; i++) {
        t = u[i].trim();
        if (t.indexOf(r) == 0) return t.substring(r.length);
    }
    return "";
}

function setCookie(n, t, i) {
    var r = new Date();
    r.setTime(r.getTime() + i * 864e5);
    document.cookie = `${n}=${t};expires=${r.toUTCString()};path=/`;
}

function randomValueGenerator(n, t) {
    var r = "", u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", f = u.length;
    for (var i = 0; i < n; i++) {
        if (i != 0 && i % t == 0 && i - 1 != n) r += "-";
        r += u.charAt(Math.floor(Math.random() * f));
    }
    return r;
}

var HiddenValues = { vCity: "", vIP: "", vCountry: "", vCountryCode: "", iqGuid: "" },
    blockedIP = ["180.151.11.118", "219.90.110.197", "49.248.15.74", "103.174.87.30", "122.176.28.132", "49.36.139.148", "49.36.136.174", "49.204.92.150"],
    contains = function (n) {
        var t = n !== n, i;
        return i = t || typeof Array.prototype.indexOf != "function" ? function (n) {
            for (var i = -1, u = 0; u < this.length; u++) {
                if ((t && this[u] !== this[u]) || this[u] === n) {
                    i = u;
                    break;
                }
            }
            return i;
        } : Array.prototype.indexOf,
            i.call(this, n) > -1;
    },
    invalid_data_msg = function (n, t) {
        if (checkempty(t)) {
            $(n).attr("data-exists", "false");
            $(n).next(".invalid-data").remove();
        } else {
            $(n).attr("data-exists", "true");
            $(n).next(".invalid-data").remove();
            $(n).after("<label class='invalid-data existingCheck' style='color:red; width:100%;padding-left: 10px;background-color: #ffffff;'> " + t + "</label>");
        }
    };

$(document).on("keypress", ".number-only", function (n) {
    var t = isNumberKey(n);
    if (!t) {
        $(this).focus();
        invalid_data_msg(this, "You have entered an invalid mobile number. Please try again.");
    } else {
        invalid_data_msg(this, "");
    }
});

$(document).on("focusout", ".number-only", function () {
    var n = $(this).val();
    if (checkempty(n)) {
        invalid_data_msg(this, "");
    } else if (!is_numeric(n)) {
        $(this).focus();
        invalid_data_msg(this, "You have entered an invalid mobile number. Please try again.");
    } else {
        invalid_data_msg(this, "");
    }
});

$(document).on("focusout", ".email-address", function () {
    var n = $(this).val();
    if (checkempty(n)) {
        invalid_data_msg(this, "");
    } else if (!validate_email(n)) {
        $(this).focus();
        invalid_data_msg(this, "You have entered an invalid e-mail address. Please try again.");
    } else {
        invalid_data_msg(this, "");
    }
});

$(document).ready(function () {
    var n = getCookie("IQDGUID"),
        t, i;

    if (checkempty(n)) {
        t = randomValueGenerator(24, 24);
        setCookie("IQDGUID", t, 2);
        n = getCookie("IQDGUID");
    }

    i = `https://api2.gtftech.com/ip/visits?user_did=${n}&url=${AgentInfo.vURL}&project=${AgentInfo.vProject}&query_id=0&event_type=Page Load&agent_id=${AgentInfo.vAgentID}`;
    $.ajax({
        url: i,
        type: "GET",
        success: function (t) {
            HiddenValues.vCity = t[0].city;
            HiddenValues.vCountry = t[0].country;
            HiddenValues.vIP = t[0].ip;
            HiddenValues.vCountryCode = "+" + t[0].callingCode;
            HiddenValues.iqGuid = n;

            if (contains.call(blockedIP, t[0].ip)) {
                $('input[type="submit"]').css("display", "none");
            }
        },
        error: function (n) {
            console.log(n);
        }
    });
});
