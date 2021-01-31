using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using WebFinalApp.Models;

namespace WebFinalApp.Controllers
{
    [ApiController]
    public class GeneralController : ControllerBase
    {
        private readonly HttpClient client;
        public GeneralController()
        {
            client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Constants.Twitter.Bearer);
        }

        private async Task<List<string>> GetLastStatuses(int numStatuses)
        {
            List<string> result = new List<string>();
            try
            {
                HttpResponseMessage response = await client.GetAsync("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + Constants.Twitter.ScreenName + "&count=" + numStatuses);
                response.EnsureSuccessStatusCode();
                string responseBody = await response.Content.ReadAsStringAsync();

                JArray tweets = JArray.Parse(responseBody);
                IEnumerable<JToken> statusIds = tweets.SelectTokens("$[*].id");

                foreach (JToken id in statusIds)
                {
                    result.Add(id.ToString());
                }
            }
            catch (HttpRequestException e)
            {

            }
            return result;
        }

        // GET api/tweets
        [HttpGet("api/GetTweets")]
        public async Task<List<string>> GetTweets()
        {
            List<string> result = new List<string>();
            try
            {
                List<string> statusIds = await GetLastStatuses(Constants.Twitter.FetchedTweets);
                foreach (var id in statusIds)
                {
                    HttpResponseMessage response = await client.GetAsync("https://publish.twitter.com/oembed?url=https://twitter.com/" + Constants.Twitter.ScreenName + "/status/" + id);
                    response.EnsureSuccessStatusCode();
                    string responseBody = await response.Content.ReadAsStringAsync();
                    result.Add(responseBody);
                }
            }
            catch (HttpRequestException e)
            {

            }
            return result;
        }
    }
}
